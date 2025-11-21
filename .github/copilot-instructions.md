# Copilot Instructions for itay-fyi

## Project Overview

Next.js 15 portfolio site with PayloadCMS 3.0 headless CMS, SQLite database (libsql), and Vercel Blob storage for media. Uses App Router with view transitions and motion animations.

## Architecture & Core Patterns

### Route Organization

- `src/app/(app)/` - Public-facing pages (portfolio, projects, about, tools)
- `src/app/(payload)/` - CMS admin routes (auto-handled by Payload)
- Route groups like `(tools)` and `(projects)` organize pages without affecting URLs
- Dynamic routes use `[slug]` pattern with `generateStaticParams` for SSG

### Data Flow

1. **Server Actions** in `actions.ts` files fetch data using `getPayload({ config })`
2. **Server Components** call actions directly (e.g., `getProjects()`, `getProject(slug)`)
3. **Client Components** receive data as props with `.client.tsx` suffix convention
4. **Payload Hooks** revalidate Next.js cache on content changes via `revalidatePath()`

### PayloadCMS Integration

- Collections in `src/collections/*.ts` define content schema (Projects, Tools, Technologies, Media, Users)
- Lexical rich text editor with HTML conversion: use `lexicalHTML('content', { name: 'content_html' })` pattern
- Auto-login in dev: `email: 'itaysarfaty@gmail.com', password: 'password'`
- Media stored in Vercel Blob, referenced via upload relationship fields

### Styling Conventions

- **Tailwind utility classes** with `cn()` helper from `@/utils` for conditional merging
- **Custom utility**: `.text-bg` applies glassmorphic background (`bg-background/40 filter backdrop-blur-[1px]`)
- **Container queries**: Use `@container` classes (requires `@tailwindcss/container-queries` plugin)
- **CSS variables**: Theme colors as HSL variables (`hsl(var(--background))`, `hsl(var(--foreground))`)
- **Font variables**: `--font-sans` (Inter), `--font-serif` (Lexend Deca)

### Animation Patterns

- Wrap app in `<MotionConfigWrapper>` (from `src/components/motion-config-wrapper.tsx`)
- Use `motion/react` imports (not `framer-motion`)
- View transitions via `next-view-transitions` library
- Hero sections animate with `initial={{ opacity: 0 }} animate={{ opacity: 1 }}`

## Development Workflows

### Key Commands (use pnpm)

```bash
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm production       # Run migrations + build
pnpm db:seed          # Seed database via tsx
pnpm generate:types   # Generate Payload TypeScript types
pnpm format           # Prettier with custom plugins
```

### Database & Migrations

- SQLite via `@payloadcms/db-sqlite` with Turso/libsql client
- Env vars: `DATABASE_URI`, `DATABASE_AUTH_TOKEN`, `BLOB_READ_WRITE_TOKEN`
- Migrations in `src/migrations/` - run via `payload migrate` before builds
- Disable auto-push: `db: sqliteAdapter({ push: false })`

### Content Updates

- When modifying collection schemas, run `pnpm generate:types` to update `src/payload-types.ts`
- Payload auto-revalidates Next.js routes via hooks in collection configs
- Seed script: `src/collections/seed.ts` run with tsx, not node

## Project-Specific Gotchas

### Import Aliases

- `@/` maps to `src/` directory
- `@payload-config` resolves to `src/payload.config.ts`

### Component Patterns

- **Hero component** (`src/components/hero.tsx`) uses dynamic height calculation client-side
- **Lexical content** render via `<LexicalRenderer content={project.content_html} />`
- **Motion components** must be client components (mark with `'use client'`)

### Route Handlers

- Payload API routes at `/api/[...slug]` and `/api/graphql` auto-configured
- OG image generation uses `html-to-image` library (see `src/app/(app)/(tools)/og-image/page.tsx`)

### Environment Requirements

- Node: `^18.20.2 || >=20.9.0`
- pnpm: `>=9.0.0` (enforced in package.json engines)
- Umami analytics in production only (see layout.tsx script tag)

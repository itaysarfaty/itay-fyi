import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.run(sql`ALTER TABLE \`projects\` ADD \`completed_at\` text DEFAULT '2025-01-21T04:51:25.229Z' NOT NULL;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.run(sql`ALTER TABLE \`projects\` DROP COLUMN \`completed_at\`;`)
}

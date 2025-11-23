import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
    await db.run(sql`PRAGMA foreign_keys=OFF;`)
    await db.run(`DROP TABLE IF EXISTS \`__new_projects\``)
    await db.run(sql`CREATE TABLE \`__new_projects\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`completed_at\` text DEFAULT '2025-11-23T22:45:17.324Z' NOT NULL,
  	\`summary\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`url\` text,
  	\`preview_image_id\` integer,
  	\`content\` text DEFAULT '' NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`preview_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
    await db.run(
        sql`INSERT INTO \`__new_projects\`("id", "title", "description", "completed_at", "summary", "slug", "url", "preview_image_id", "content", "updated_at", "created_at") SELECT "id", "title", "description", "completed_at", "summary", "slug", "url", "preview_image_id", "content", "updated_at", "created_at" FROM \`projects\`;`
    )
    await db.run(sql`DROP TABLE \`projects\`;`)
    await db.run(sql`ALTER TABLE \`__new_projects\` RENAME TO \`projects\`;`)
    await db.run(sql`PRAGMA foreign_keys=ON;`)
    await db.run(
        sql`CREATE UNIQUE INDEX \`projects_title_idx\` ON \`projects\` (\`title\`);`
    )
    await db.run(
        sql`CREATE UNIQUE INDEX \`projects_slug_idx\` ON \`projects\` (\`slug\`);`
    )
    await db.run(
        sql`CREATE INDEX \`projects_preview_image_idx\` ON \`projects\` (\`preview_image_id\`);`
    )
    await db.run(
        sql`CREATE INDEX \`projects_updated_at_idx\` ON \`projects\` (\`updated_at\`);`
    )
    await db.run(
        sql`CREATE INDEX \`projects_created_at_idx\` ON \`projects\` (\`created_at\`);`
    )
}

export async function down({
    db,
    payload,
    req,
}: MigrateDownArgs): Promise<void> {
    await db.run(sql`PRAGMA foreign_keys=OFF;`)
    await db.run(sql`CREATE TABLE \`__new_projects\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`completed_at\` text DEFAULT '2025-08-03T00:00:39.414Z' NOT NULL,
  	\`summary\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`url\` text,
  	\`preview_image_id\` integer,
  	\`content\` text,
  	\`content_html\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`preview_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
    await db.run(
        sql`INSERT INTO \`__new_projects\`("id", "title", "description", "completed_at", "summary", "slug", "url", "preview_image_id", "content", "content_html", "updated_at", "created_at") SELECT "id", "title", "description", "completed_at", "summary", "slug", "url", "preview_image_id", "content", "content_html", "updated_at", "created_at" FROM \`projects\`;`
    )
    await db.run(sql`DROP TABLE \`projects\`;`)
    await db.run(sql`ALTER TABLE \`__new_projects\` RENAME TO \`projects\`;`)
    await db.run(sql`PRAGMA foreign_keys=ON;`)
    await db.run(
        sql`CREATE UNIQUE INDEX \`projects_title_idx\` ON \`projects\` (\`title\`);`
    )
    await db.run(
        sql`CREATE UNIQUE INDEX \`projects_slug_idx\` ON \`projects\` (\`slug\`);`
    )
    await db.run(
        sql`CREATE INDEX \`projects_preview_image_idx\` ON \`projects\` (\`preview_image_id\`);`
    )
    await db.run(
        sql`CREATE INDEX \`projects_updated_at_idx\` ON \`projects\` (\`updated_at\`);`
    )
    await db.run(
        sql`CREATE INDEX \`projects_created_at_idx\` ON \`projects\` (\`created_at\`);`
    )
}

import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.run(sql`CREATE TABLE \`tools\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`action_label\` text,
  	\`slug\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await payload.db.drizzle.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`tools_id\` integer REFERENCES tools(id);`)
  await payload.db.drizzle.run(sql`CREATE UNIQUE INDEX \`tools_title_idx\` ON \`tools\` (\`title\`);`)
  await payload.db.drizzle.run(sql`CREATE UNIQUE INDEX \`tools_slug_idx\` ON \`tools\` (\`slug\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`tools_created_at_idx\` ON \`tools\` (\`created_at\`);`)
  await payload.db.drizzle.run(sql`/*
   SQLite does not support "Creating foreign key on existing column" out of the box, we do not generate automatic migration for that, so it has to be done manually
   Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                    https://www.sqlite.org/lang_altertable.html
  
   Due to that we don't generate migration automatically and it has to be done manually
  */`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.run(sql`DROP TABLE \`tools\`;`)
  await payload.db.drizzle.run(sql`/*
   SQLite does not support "Dropping foreign key" out of the box, we do not generate automatic migration for that, so it has to be done manually
   Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                    https://www.sqlite.org/lang_altertable.html
  
   Due to that we don't generate migration automatically and it has to be done manually
  */`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`payload_locked_documents_rels\` DROP COLUMN \`tools_id\`;`)
}

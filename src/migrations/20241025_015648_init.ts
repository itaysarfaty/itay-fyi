import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.run(sql`CREATE TABLE \`projects\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
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
  await payload.db.drizzle.run(sql`CREATE TABLE \`projects_rels\` (
  	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`technologies_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`technologies_id\`) REFERENCES \`technologies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
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
  await payload.db.drizzle.run(sql`CREATE TABLE \`technologies\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`projects_id\` integer,
  	\`tools_id\` integer,
  	\`technologies_id\` integer,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tools_id\`) REFERENCES \`tools\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`technologies_id\`) REFERENCES \`technologies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await payload.db.drizzle.run(sql`CREATE UNIQUE INDEX \`projects_title_idx\` ON \`projects\` (\`title\`);`)
  await payload.db.drizzle.run(sql`CREATE UNIQUE INDEX \`projects_slug_idx\` ON \`projects\` (\`slug\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`projects_created_at_idx\` ON \`projects\` (\`created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`projects_rels_order_idx\` ON \`projects_rels\` (\`order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`projects_rels_parent_idx\` ON \`projects_rels\` (\`parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`projects_rels_path_idx\` ON \`projects_rels\` (\`path\`);`)
  await payload.db.drizzle.run(sql`CREATE UNIQUE INDEX \`tools_title_idx\` ON \`tools\` (\`title\`);`)
  await payload.db.drizzle.run(sql`CREATE UNIQUE INDEX \`tools_slug_idx\` ON \`tools\` (\`slug\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`tools_created_at_idx\` ON \`tools\` (\`created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE UNIQUE INDEX \`technologies_name_idx\` ON \`technologies\` (\`name\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`technologies_created_at_idx\` ON \`technologies\` (\`created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.run(sql`DROP TABLE \`projects\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`projects_rels\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`tools\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`technologies\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`users\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`media\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`payload_preferences\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`payload_migrations\`;`)
}

import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.run(sql`/*
   SQLite does not support "Set default to column" out of the box, we do not generate automatic migration for that, so it has to be done manually
   Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                    https://www.sqlite.org/lang_altertable.html
                    https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3
  
   Due to that we don't generate migration automatically and it has to be done manually
  */`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.run(sql`/*
   SQLite does not support "Drop default from column" out of the box, we do not generate automatic migration for that, so it has to be done manually
   Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                    https://www.sqlite.org/lang_altertable.html
                    https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3
  
   Due to that we don't generate migration automatically and it has to be done manually
  */`)
}

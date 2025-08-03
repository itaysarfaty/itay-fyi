import * as migration_20241025_015648_init from './20241025_015648_init';
import * as migration_20250121_045125_add_complete_date from './20250121_045125_add_complete_date';
import * as migration_20250405_230919_version_updates from './20250405_230919_version_updates';
import * as migration_20250803_000039_users_sessions from './20250803_000039_users_sessions';

export const migrations = [
  {
    up: migration_20241025_015648_init.up,
    down: migration_20241025_015648_init.down,
    name: '20241025_015648_init',
  },
  {
    up: migration_20250121_045125_add_complete_date.up,
    down: migration_20250121_045125_add_complete_date.down,
    name: '20250121_045125_add_complete_date',
  },
  {
    up: migration_20250405_230919_version_updates.up,
    down: migration_20250405_230919_version_updates.down,
    name: '20250405_230919_version_updates',
  },
  {
    up: migration_20250803_000039_users_sessions.up,
    down: migration_20250803_000039_users_sessions.down,
    name: '20250803_000039_users_sessions'
  },
];

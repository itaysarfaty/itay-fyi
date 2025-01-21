import * as migration_20241025_015648_init from './20241025_015648_init';
import * as migration_20250121_043815_add_complete_date from './20250121_043815_add_complete_date';
import * as migration_20250121_044419_add_complete_date_2 from './20250121_044419_add_complete_date_2';

export const migrations = [
  {
    up: migration_20241025_015648_init.up,
    down: migration_20241025_015648_init.down,
    name: '20241025_015648_init',
  },
  {
    up: migration_20250121_043815_add_complete_date.up,
    down: migration_20250121_043815_add_complete_date.down,
    name: '20250121_043815_add_complete_date',
  },
  {
    up: migration_20250121_044419_add_complete_date_2.up,
    down: migration_20250121_044419_add_complete_date_2.down,
    name: '20250121_044419_add_complete_date_2'
  },
];

import * as migration_20241025_015648_init from './20241025_015648_init';

export const migrations = [
  {
    up: migration_20241025_015648_init.up,
    down: migration_20241025_015648_init.down,
    name: '20241025_015648_init'
  },
];

import * as migration_20240908_231426_init from './20240908_231426_init'

export const migrations = [
    {
        up: migration_20240908_231426_init.up,
        down: migration_20240908_231426_init.down,
        name: '20240908_231426_init',
    },
]

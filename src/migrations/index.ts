import * as migration_20240908_231426_init from './20240908_231426_init';
import * as migration_20240925_040449_remove_articles from './20240925_040449_remove_articles';
import * as migration_20241006_204725_add_projects from './20241006_204725_add_projects';

export const migrations = [
  {
    up: migration_20240908_231426_init.up,
    down: migration_20240908_231426_init.down,
    name: '20240908_231426_init',
  },
  {
    up: migration_20240925_040449_remove_articles.up,
    down: migration_20240925_040449_remove_articles.down,
    name: '20240925_040449_remove_articles',
  },
  {
    up: migration_20241006_204725_add_projects.up,
    down: migration_20241006_204725_add_projects.down,
    name: '20241006_204725_add_projects'
  },
];

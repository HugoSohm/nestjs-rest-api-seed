import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

function getDatabase(): TypeOrmModuleOptions & {
  seeds?: string[];
  factories?: string[];
} {
  if (!(process.env.NODE_ENV === 'production')) {
    dotenv.config({ path: '.env.dev' });
  }

  return {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities:
      process.env.NODE_ENV === 'test'
        ? ['src/**/*.entity.ts']
        : ['dist/**/*.entity{.ts,.js}'],
    synchronize: false,
    keepConnectionAlive: true,
    migrationsRun: true,
    logging: process.env.DATABASE_SHOW_SQL === 'true' || false,
    migrations:
      process.env.NODE_ENV === 'test'
        ? ['src/core/database/migrations/**/*.ts']
        : ['dist/core/database/migrations/**/*.js'],
    seeds:
      process.env.NODE_ENV === 'test'
        ? ['src/core/database/seed/seeder/**/*.ts']
        : ['dist/core/database/seed/seeder/**/*.js'],
    factories:
      process.env.NODE_ENV === 'test'
        ? ['src/core/database/seed/factory/**/*.ts']
        : ['dist/core/database/seed/factory/**/*.js'],
    cli: {
      migrationsDir: 'src/core/database/migrations',
    },
  };
}

const databaseConfiguration = getDatabase();
export = databaseConfiguration;

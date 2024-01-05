import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import env from './dev.env';

env.pgport = typeof env.pgport === 'string' ? env.pgport : '';

const settingEnv = {
  type: 'postgres',
  schema: 'public',
  database: env.pgdb,
  host: env.host,
  port: parseInt(env.pgport),
  username: env.pguser,
  password: env.pgpassword,
  synchronize: true,
  entities: ['dist/src/entities/*.entity.{ts,js}'],
  logging: false,
} as TypeOrmModuleOptions;

const settingBackup = {
  type: 'postgres',
  schema: 'public',
  database: 'blog',
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  synchronize: true,
  entities: ['dist/src/entities/*.entity.{ts,js}'],
  logging: false,
} as TypeOrmModuleOptions;

const settingLocal = {
  type: 'postgres',
  schema: 'public',
  database: 'blog',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  synchronize: true,
  entities: ['dist/src/entities/*.entity.{ts,js}'],
  logging: false,
} as TypeOrmModuleOptions;

export default TypeOrmModule.forRoot(settingBackup);

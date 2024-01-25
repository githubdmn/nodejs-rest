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

// in case the env fails mapping
const settingBackup = {
  type: 'postgres',
  schema: 'public',
  database: 'technical',
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
  database: 'technical',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  synchronize: true,
  entities: ['dist/src/entities/*.entity.{ts,js}'],
  logging: false,
} as TypeOrmModuleOptions;

// environment can be 'production' od 'development'
const setting = env.environment === 'production' ? settingEnv : settingLocal;

export default TypeOrmModule.forRoot(setting);

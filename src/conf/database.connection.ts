import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import env from './dev.env';

const { type, schema, database, host, port, username, password, synchronize, logging } = env.db;

const SqlSettingEnv = {
  type,
  schema,
  database,
  host,
  port,
  username,
  password,
  synchronize,
  entities: ['dist/src/entities/*.entity.{ts,js}'],
  logging,
} as TypeOrmModuleOptions;

const sqliteSettingEnv = {
  type: 'sqlite',
  database: 'db/tech-assignment.sqlite',
  synchronize: true,
  entities: ['dist/src/common/entities/*.entity.{ts,js}'],
} as TypeOrmModuleOptions;


export default TypeOrmModule.forRoot(sqliteSettingEnv);

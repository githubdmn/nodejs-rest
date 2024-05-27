import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import env from './dev.env';

const dbSettingEnv = {
  type: env.pgType,
  schema: env.pgSchema,
  database: env.pgdb,
  host: env.host,
  port: env.pgport,
  username: env.pguser,
  password: env.pgpassword,
  synchronize: env.pgSync,
  entities: ['dist/src/entities/*.entity.{ts,js}'],
  logging: env.pgLogging,
} as TypeOrmModuleOptions;

export default TypeOrmModule.forRoot(dbSettingEnv);

// in case the env fails mapping
// const settingBackup = {
//   type: 'postgres',
//   schema: 'public',
//   database: 'technical',
//   host: 'postgres',
//   port: 5432,
//   username: 'postgres',
//   password: 'postgres',
//   synchronize: true,
//   entities: ['dist/src/entities/*.entity.{ts,js}'],
//   logging: false,
// } as TypeOrmModuleOptions;

// const settingLocal = {
//   type: 'postgres',
//   schema: 'public',
//   database: 'technical',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: 'postgres',
//   synchronize: true,
//   entities: ['dist/src/entities/*.entity.{ts,js}'],
//   logging: false,
// } as TypeOrmModuleOptions;

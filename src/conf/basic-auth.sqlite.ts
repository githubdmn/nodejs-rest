import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";

const basicAuth = 'db/basic-auth.sqlite';
const basicAuthEntiities = 'dist/src/api/auth/custom/entities/*.entity.{ts,js}';

const sqliteAuthSettingsEnv = {
  type: 'sqlite',
  database: basicAuth,
  synchronize: true,
  entities: [basicAuthEntiities],
} as TypeOrmModuleOptions;

export default TypeOrmModule.forRoot(sqliteAuthSettingsEnv);

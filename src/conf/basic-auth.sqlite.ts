// custom-auth-db.connection.ts
import { TypeOrmModuleOptions, TypeOrmModule } from '@nestjs/typeorm';
const basicAuth = 'db/basic-auth.sqlite';

const sqliteAuthSettingsEnv: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: basicAuth,
  synchronize: true,
  entities: ['dist/src/api/auth/custom/entities/*.entity.{ts,js}'],
};

export default TypeOrmModule.forRoot(sqliteAuthSettingsEnv);

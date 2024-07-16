import { Module } from '@nestjs/common';
import { POSTGRES_USER, POSTGRES_AUTH, POSTGRES_TODO, SQLITE_AUTH_USER } from '@/utils/constants';
import {
  PostgresAuthService,
  PostgresTodoService,
  PostgresUserService,
} from './sql/postgresdb';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entities } from '@/entities';
import { UserAuthSqlite } from './sql/sqlite';

const TypeOrmLocal = TypeOrmModule.forFeature([...Entities]);
const PostgresServices = [
  {
    provide: POSTGRES_USER,
    useClass: PostgresUserService,
  },
  {
    provide: POSTGRES_TODO,
    useClass: PostgresTodoService,
  },
  {
    provide: POSTGRES_AUTH,
    useClass: PostgresAuthService,
  },
];
const SqliteServices = [
  {
    provide: SQLITE_AUTH_USER,
    useClass: UserAuthSqlite,
  },
];

@Module({
  imports: [TypeOrmLocal],
  providers: [...PostgresServices, ...SqliteServices],
  exports: [...PostgresServices, ...SqliteServices],
})
export class DatabaseModule { }

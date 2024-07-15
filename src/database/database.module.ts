import { Module } from '@nestjs/common';
import { POSTGRES_USER, POSTGRES_AUTH, POSTGRES_TODO, SQLITE_USER_AUTH } from '@/utils/constants';
import {
  PostgresAuthService,
  PostgresTodoService,
  PostgresUserService,
} from './sql/postgresdb';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entities } from '@/entities';
import { UserAuth } from './sql/sqlite';

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
    provide: SQLITE_USER_AUTH,
    useClass: UserAuth,
  },
];

@Module({
  imports: [TypeOrmLocal],
  providers: [...PostgresServices, ...SqliteServices],
  exports: [...PostgresServices, ...SqliteServices],
})
export class DatabaseModule { }

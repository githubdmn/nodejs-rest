import { Module } from '@nestjs/common';
import { SQLITE_AUTH_USER } from '@/utils/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entities } from '@/entities';
import { UserAuthSqlite } from './sql/sqlite';

const TypeOrmLocal = TypeOrmModule.forFeature([...Entities]);

const SqliteServices = [
  {
    provide: SQLITE_AUTH_USER,
    useClass: UserAuthSqlite,
  },
];

@Module({
  imports: [TypeOrmLocal],
  providers: [ ...SqliteServices],
  exports: [ ...SqliteServices],
})
export class DatabaseModule { }

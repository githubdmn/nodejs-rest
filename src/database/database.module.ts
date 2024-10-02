import { Module } from '@nestjs/common';
import { POSTGRES_USER, POSTGRES_AUTH, POSTGRES_TODO } from '@/utils/constants';
import {
  PostgresAuthService,
  PostgresTodoService,
  PostgresUserService,
} from './sql/postgresdb';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Entities from '@/entities';


export const entitiesList = Object.values(Entities);

const TypeOrmLocal = TypeOrmModule.forFeature(entitiesList);
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

@Module({
  imports: [TypeOrmLocal],
  providers: [...PostgresServices],
  exports: [...PostgresServices],
})
export class DatabaseModule {}

// TODO: implement mongodb service
// const MongooseModuleLocal = MongooseModule.forFeature([
//   { name: 'User', schema: {} },
// ]);

// // TODO: implement mongodb service
// const MongoServices = [
//   {
//     provide: 'MONGO_USER',
//     useClass: PostgresUserService, // NOT IMPLEMENTED
//   },
//   {
//     provide: 'Mongo_Todo',
//     useClass: MongoTodoService, // NOT IMPLEMENTED
//   },
// ];

// const SetDB =
//   env.dbUse === 'postgres'
//     ? { Imports: TypeOrmLocal, Services: PostgresServices }
//     : { Imports: MongooseModuleLocal, Services: MongoServices };

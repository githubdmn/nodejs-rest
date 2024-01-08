import { Module } from '@nestjs/common';
import { POSTGRES_BLOG, POSTGRES_USER, POSTGRES_AUTH } from '@/utils/constants';
import {
  PostgresAuthService,
  PostgresBlogService,
  PostgresUserService,
} from './sql/postgresdb';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity, BlogEntity, UserEntity } from '@/entities';

const TypeOrmLocal = TypeOrmModule.forFeature([
  UserEntity,
  BlogEntity,
  AuthEntity,
]);
const PostgresServices = [
  {
    provide: POSTGRES_USER,
    useClass: PostgresUserService,
  },
  {
    provide: POSTGRES_BLOG,
    useClass: PostgresBlogService,
  },
  {
    provide: POSTGRES_AUTH,
    useClass: PostgresAuthService,
  },
];

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
//     provide: 'Mongo_Blog',
//     useClass: PostgresBlogService, // NOT IMPLEMENTED
//   },
// ];

// const SetDB =
//   env.dbUse === 'postgres'
//     ? { Imports: TypeOrmLocal, Services: PostgresServices }
//     : { Imports: MongooseModuleLocal, Services: MongoServices };

@Module({
  imports: [TypeOrmLocal],
  providers: [...PostgresServices],
  exports: [...PostgresServices],
})
export class DatabaseModule {}

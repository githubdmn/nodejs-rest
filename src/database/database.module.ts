import { Module } from '@nestjs/common';
import { POSTGRES_BLOG, POSTGRES_USER } from '@/constants/instances.constants';
import { PostgresBlogService, PostgresUserService } from './sql/postgresdb';
import { env } from '@/conf';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity, UserEntity } from '@/entities';
import { MongooseModule } from '@nestjs/mongoose';

const TypeOrmLocal = TypeOrmModule.forFeature([UserEntity, BlogEntity]);
const PostgresServices = [
  {
    provide: POSTGRES_USER,
    useClass: PostgresUserService,
  },
  {
    provide: POSTGRES_BLOG,
    useClass: PostgresBlogService,
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

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongodbService } from './mongodb/mongodb.service';
import {
  MONGODB_SERVICE,
  POSTGRES_SERVICE,
} from '@/constants/instances.constants';
import { PostgresdbService } from './sql/postgresdb/postgresdb.service';

const Services = [
  {
    provide: MONGODB_SERVICE,
    useClass: MongodbService,
  },
  {
    provide: POSTGRES_SERVICE,
    useClass: PostgresdbService,
  },
];

const MongooseModuleLocal = MongooseModule.forRootAsync({
  useFactory: () => ({
    connectionFactory: (connection) => {
      if (connection.readyState === 1) {
        console.log('Database Connected successfully');
      }
      connection.on('disconnected', () => {
        console.log('Database disconnected');
      });
      connection.on('error', (error: any) => {
        console.log('Database connection failed! for error: ', error);
      });

      return connection;
    },
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/blog',
  }),
});

const TypeOrmModuleLocal = TypeOrmModule.forRoot({
  type: 'postgres',
  schema: 'public',
  database: env.pgdb,
  host: env.host,
  port: env.pgport,
  username: env.pguser,
  password: env.pgpassword,
  synchronize: true,
  entities: ['dist/src/entities/*.entity.{ts,js}'],
});

@Module({
  imports: [],
  providers: [...Services],
})
export class DatabaseModule {}

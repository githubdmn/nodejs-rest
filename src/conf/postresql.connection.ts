import { TypeOrmModule } from '@nestjs/typeorm';
import env from './dev.env';

export default TypeOrmModule.forRoot({
  type: 'postgres',
  schema: 'public',
  database: env.pgdb,
  host: env.host,
  port: env.pgport,
  username: env.pguser,
  password: env.pgpassword,
  synchronize: true,
  entities: ['dist/src/entities/*.entity.{ts,js}'],
  logging: true,
});

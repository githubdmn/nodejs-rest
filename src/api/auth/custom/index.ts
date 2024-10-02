import { TypeOrmModule } from '@nestjs/typeorm';
import AuthEntities from './entities';

const AuthEntitiesList = Object.values({ ...AuthEntities });
export const TypeOrmCustomAuth = TypeOrmModule.forFeature([
  ...AuthEntitiesList,
]);


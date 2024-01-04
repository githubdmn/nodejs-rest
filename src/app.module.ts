import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { TypeORMConfig } from './conf';
import { UserModule } from './api/user/user.module';

@Module({
  imports: [TypeORMConfig, UserModule],
})
export class AppModule {}

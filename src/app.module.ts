import { Module } from '@nestjs/common';
import { databaseConnection } from './conf';
import { AuthModule } from './api/auth/auth.module';

@Module({
  imports: [databaseConnection, AuthModule],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { CustomAuthDBConnection } from './conf';

@Module({
  imports: [CustomAuthDBConnection, AuthModule],
})
export class AppModule {}

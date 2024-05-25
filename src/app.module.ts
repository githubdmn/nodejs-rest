import { Module } from '@nestjs/common';
import { TypeORMConfig } from './conf';
import { UserModule } from './api/user/user.module';
import { TodoModule } from './api/todo/todo.module';
import { AuthModule } from './api/auth/auth.module';

@Module({
  imports: [TypeORMConfig, UserModule, TodoModule, AuthModule],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeORMConfig } from './conf';
import { UserModule } from './api/user/user.module';
import { TodoModule } from './api/todo/todo.module';

@Module({
  imports: [TypeORMConfig, UserModule, TodoModule],
})
export class AppModule {}

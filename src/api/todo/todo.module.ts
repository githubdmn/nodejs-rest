import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { DatabaseModule } from '@/database/database.module';
import { AUTH_ADMIN_SERVICE } from '@/utils/constants';

const Service = [
  {
    provide: AUTH_ADMIN_SERVICE,
    useClass: TodoService,
  },
];

@Module({
  providers: [...Service],
  controllers: [TodoController],
  imports: [DatabaseModule],
})
export class TodoModule {}

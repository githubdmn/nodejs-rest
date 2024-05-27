import { CreateTodoListResponseDto } from '@/dto';
import { TodoList } from '@/entities';

export default (created: TodoList): Partial<CreateTodoListResponseDto> => ({
  listId: created.listId!,
  title: created.title,
});

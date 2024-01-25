import { DeleteTodoListResponseDto } from '@/dto';
import { TodoList } from '@/entities';

export default (deletedTodoList: TodoList): DeleteTodoListResponseDto => ({
  listId: deletedTodoList.listId,
  message: 'Todo list deleted successfully',
});

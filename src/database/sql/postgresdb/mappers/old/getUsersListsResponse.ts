import { GetUsersTodoListsResponseDto } from '@/dto';
import { TodoList } from '@/entities';

export default (userTodoLists: TodoList[]): GetUsersTodoListsResponseDto[] =>
  userTodoLists.map((todoList) => ({
    listId: todoList.listId,
    title: todoList.title,
  }));

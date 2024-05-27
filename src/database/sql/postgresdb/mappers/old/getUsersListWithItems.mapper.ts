import { GetUsersTodoListsResponseWithItemsDto, TodoListDto } from '@/dto';
import { TodoList } from '@/entities';

export default (
  userTodoListsWithItems: TodoList[],
): GetUsersTodoListsResponseWithItemsDto[] =>
  userTodoListsWithItems.map((todoList) => ({
    todoLists: [
      {
        listId: todoList.listId,
        title: todoList.title,
        items: todoList.items.map((item) => ({
          itemId: item.itemId,
          text: item.text,
          isDone: item.isDone,
        })),
      },
    ],
  }));

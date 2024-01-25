import { GetUsersTodoListResponseDto } from '@/dto';
import { TodoList } from '@/entities';

export default (list: TodoList): GetUsersTodoListResponseDto => {
  return {
    listId: list.listId,
    title: list.title,
    items: list.items.map((item) => ({
      itemId: item.itemId,
      text: item.text,
      isDone: item.isDone,
    })),
  };
};

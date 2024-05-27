import { CreateTodoItemResponseDto, TodoItemDto } from '@/dto';

export default (item: TodoItemDto): TodoItemDto => ({
  itemId: item.itemId,
  text: item.text,
  isDone: item.isDone,
});

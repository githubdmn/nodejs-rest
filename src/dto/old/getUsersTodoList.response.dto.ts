import { ApiProperty } from '@nestjs/swagger';
import { TodoItemDto } from './getUsersTodoListsResponseWithItems.dto';

export class GetUsersTodoListResponseDto {
  @ApiProperty()
  listId: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  items: TodoItemDto[];
}

export class GetUsersTodoItemResponseDto {
  @ApiProperty()
  itemId: string;
  @ApiProperty()
  text: string;
  @ApiProperty()
  isDone: boolean;
}

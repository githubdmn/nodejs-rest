import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class TodoItemDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  itemId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty()
  @IsBoolean()
  isDone: boolean;
}

export class TodoListDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  listId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: [TodoItemDto] })
  items: TodoItemDto[];
}

export class GetUsersTodoListsResponseWithItemsDto {
  @ApiProperty({ type: [TodoListDto] })
  todoLists: TodoListDto[];
}

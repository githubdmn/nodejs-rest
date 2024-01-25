import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class CreateTodoListResponseDto {
  @ApiProperty()
  @IsString()
  listId: string;

  @ApiProperty()
  @IsString()
  title: string;
}

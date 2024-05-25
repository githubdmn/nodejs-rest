import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class UpdateTodoListRequestDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  listId: string;

  @ApiProperty()
  @IsString()
  title: string;
}

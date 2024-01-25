import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export default class DeleteTodoListResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  listId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  message: string;
}

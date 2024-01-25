import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class UpdateTodoItemRequestDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  listId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  text: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  @IsBoolean()
  isDone: boolean;
}

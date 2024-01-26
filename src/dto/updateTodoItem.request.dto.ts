import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class UpdateTodoItemRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  listId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  itemId: string;

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

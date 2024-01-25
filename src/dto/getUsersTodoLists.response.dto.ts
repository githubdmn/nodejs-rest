import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class GetUsersTodoListsResponseDto {
  @ApiProperty()
  @IsString()
  listId: string;

  @ApiProperty()
  @IsString()
  title: string;
}

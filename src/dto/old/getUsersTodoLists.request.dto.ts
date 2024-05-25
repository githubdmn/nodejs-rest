import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export default class GetUsersTodoListsRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;
}

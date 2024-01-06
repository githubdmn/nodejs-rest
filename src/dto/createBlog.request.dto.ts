import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateBlogRequestDto {
  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  text: string;
}

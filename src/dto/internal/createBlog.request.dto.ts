import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateBlogInternalRequestDto {
  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  text: string;
}

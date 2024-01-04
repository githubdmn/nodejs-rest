import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class DeleteBlogResponseDto {
  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  blogId: string;

  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  text: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class DeleteBlogResponseDto {
  @ApiProperty({ example: '123' })
  @IsNotEmpty()
  @IsString()
  blogId: string;

  @ApiProperty({ example: 'Sample Blog Title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'This is the content of the blog post.' })
  @IsNotEmpty()
  @IsString()
  text: string;
}

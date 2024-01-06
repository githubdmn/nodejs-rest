import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateBlogResponseDto {
  @ApiProperty({ example: 'Updated Blog Title' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Updated blog content.' })
  @IsString()
  text: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsString()
  userId: string;
}

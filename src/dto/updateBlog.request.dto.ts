import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateBlogRequestDto {
  @ApiProperty({ example: 'Updated Blog Title' })
  @IsString()
  title?: string;

  @ApiProperty({ example: 'Updated blog content.' })
  @IsString()
  text?: string;
}

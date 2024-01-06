import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateBlogRequestDto {
  @ApiProperty({})
  @IsString()
  title?: string;

  @ApiProperty({})
  @IsString()
  text?: string;
}

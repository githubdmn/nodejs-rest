import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateBlogInternalRequestDto {
  @ApiProperty({})
  @IsString()
  title?: string;

  @ApiProperty({})
  @IsString()
  text?: string;
}

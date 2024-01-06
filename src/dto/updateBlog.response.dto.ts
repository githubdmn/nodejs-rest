import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateBlogResponseDto {
  @ApiProperty({})
  @IsString()
  title: string;

  @ApiProperty({})
  @IsString()
  text: string;

  @ApiProperty({})
  @IsString()
  userId: string;
}

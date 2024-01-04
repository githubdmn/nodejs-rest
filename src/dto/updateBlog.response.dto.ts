import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateBlogResponseDto {
  @ApiProperty({})
  @IsString()
  readonly title: string;

  @ApiProperty({})
  @IsString()
  readonly text: string;

  @ApiProperty({})
  @IsString()
  readonly userId: string;
}

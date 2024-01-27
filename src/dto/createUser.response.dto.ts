import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserResponseDto {
  @Exclude()
  id: string;

  @ApiProperty({ example: 1 })
  userId: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsString()
  email: string;

  @Exclude()
  @IsString()
  password: string;
}

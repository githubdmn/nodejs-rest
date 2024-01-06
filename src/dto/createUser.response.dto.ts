import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export default class CreateUserResponse {
  @ApiProperty({})
  @Exclude()
  id: number;

  @ApiProperty({})
  @IsString()
  email: string;

  @Exclude()
  @IsString()
  password: string;
}

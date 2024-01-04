import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class CreateUserRequest {
  @ApiProperty({})
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  password: string;
}

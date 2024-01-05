import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class UserLoginResponse {
  @ApiProperty({})
  @IsString()
  accessToken: string;

  @ApiProperty({})
  @IsString()
  refreshToken: string;

  @ApiProperty({})
  @IsString()
  id: number;
}

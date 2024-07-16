import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class ChangePasswordRequestDto {
  @ApiProperty({ name: 'Old Password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  oldPassword: string;

  @ApiProperty({ name: 'New Password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  newPassword: string;
}

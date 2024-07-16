import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsString, IsOptional, IsEmail } from 'class-validator';

export class UpdateUserResponseDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Exclude()
  readonly password?: string;
}

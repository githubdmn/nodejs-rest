import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class LoginRequestDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['user', 'admin'])
  readonly userType: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
}

export class LoginResponseDto {
  id: string;
  email: string;
}

export class ChangePasswordRequestDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['user', 'admin'])
  readonly userType: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly newPassword: string;
}

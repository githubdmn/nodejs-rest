import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsString,
  IsDate,
} from 'class-validator';

export class RegistrationRequestBaseDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
}

export class CreateUserRequestDto extends RegistrationRequestBaseDto {
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;
}

export class CreateAdminRequestDto extends RegistrationRequestBaseDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}

export class RegistrationResponseBaseDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;
}

export class CreateUserResponseDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;
}

export class CreateAdminResponseDto {
  @IsNotEmpty()
  @IsString()
  adminId: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}


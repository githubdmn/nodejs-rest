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

export class RegisterEndUserRequestDto extends RegistrationRequestBaseDto {
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


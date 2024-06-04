export class LoginRequestDto {
  email: string;
  password: string;
}

export class LoginResponseDto {
  id: string;
  email: string;
}

export class ChangePasswordRequestDto {
  username: string;
  password: string;
  newPassword: string;
}

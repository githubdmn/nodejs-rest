export class LoginRequestDto {
  userType: string;
  email: string;
  password: string;
}

export class LoginResponseDto {
  id: string;
  email: string;
}

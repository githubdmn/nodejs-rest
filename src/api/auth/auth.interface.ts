import {
  AdminRegisterRequestDto,
  AdminRegisterResponseDto,
  CredentialsDto,
  UserDto,
  UserLoginRequestDto,
  UserLoginResponseDto,
  UserRegisterRequestDto,
  UserRegisterResponseDto,
} from '@/dto';

export interface IAuthService {
  registerUser(
    userRequest: UserRegisterRequestDto,
  ): Promise<UserRegisterResponseDto>;
  registerAdmin(
    user: AdminRegisterRequestDto,
  ): Promise<AdminRegisterResponseDto>;
  userExists(email: string): Promise<boolean>;
  validateUser(credentials: CredentialsDto): Promise<boolean>;
  loginUser(email: string): any;
  logout(refreshToken: string): Promise<string>;
  refreshAccessToken(
    user: Partial<UserDto>,
    refreshToken: string,
  ): Promise<UserLoginResponseDto>;
  changePassword(
    isAdmin: boolean,
    userId: string,
    password: string,
    newPassword: string,
  ): Promise<boolean>;
}

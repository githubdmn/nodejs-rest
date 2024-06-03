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
  getJwt(userLogin: UserLoginRequestDto): Promise<UserLoginResponseDto>;
  changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<string>;
  logout(refreshToken: string): Promise<string>;
  refreshAccessToken(
    user: Partial<UserDto>,
    refreshToken: string,
  ): Promise<UserLoginResponseDto>;
}

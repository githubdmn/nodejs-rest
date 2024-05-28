import {
  AdminRegisterRequestDto,
  AdminRegisterResponseDto,
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
  login(): any;
  getJwt(userLogin: UserLoginRequestDto): Promise<UserLoginResponseDto>;
  changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<string>;
  logout(refreshToken: string): Promise<string>;
  refreshToken(
    user: Partial<UserDto>,
    refreshToken: string,
  ): Promise<UserLoginResponseDto>;
}

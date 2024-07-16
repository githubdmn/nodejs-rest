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
import { RefreshTokenResponseDto } from './dto';

export interface IAuthService {
  registerUser(
    userRequest: UserRegisterRequestDto,
  ): Promise<UserRegisterResponseDto>;
  registerAdmin(
    user: AdminRegisterRequestDto,
  ): Promise<AdminRegisterResponseDto>;
  userExists(email: string): Promise<boolean>;
  validateUser(credentials: CredentialsDto): Promise<boolean>;
  login(isAdmin: boolean, email: string): Promise<RefreshTokenResponseDto>;
  logout(refreshToken: string): Promise<string>;
  refreshAccessToken(
    id: string,
    email: string,
    refreshToken: string,
  ): Promise<RefreshTokenResponseDto>;
  changePassword(
    isAdmin: boolean,
    userId: string,
    password: string,
    newPassword: string,
  ): Promise<boolean>;
}

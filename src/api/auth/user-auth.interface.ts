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

export interface IUserAuth {
  register(
    userRequest: UserRegisterRequestDto,
  ): Promise<UserRegisterResponseDto>;
  // validateUser(credentials: CredentialsDto): Promise<boolean>;
  // login(email: string): Promise<RefreshTokenResponseDto>;
  // logout(refreshToken: string): Promise<string>;
  // refreshAccessToken(
  //   id: string,
  //   email: string,
  //   refreshToken: string,
  // ): Promise<RefreshTokenResponseDto>;
  // changePassword(
  //   userId: string,
  //   password: string,
  //   newPassword: string,
  // ): Promise<boolean>;
  // resetPassword(
  //   email: string,
  // ): Promise<boolean>;
}

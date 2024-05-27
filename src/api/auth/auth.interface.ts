import {
  CreateUserRequestDto,
  CreateUserResponseDto,
  SaveLoginRequestDto,
  UserDto,
  UserLoginRequestDto,
  UserLoginResponseDto,
  UserRegisterRequestDto,
  UserRegisterResponseDto,
} from '@/dto';
import { UserRequestDto, UserResponseDto } from './dto/auth-register.dto';

export interface IAuthService {
   registerUser(
    userRequest: UserRegisterRequestDto,
  ): Promise<UserRegisterResponseDto>;
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

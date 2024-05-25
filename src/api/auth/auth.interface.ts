import {
	AuthRegisterRequestDto,
  CreateUserRequestDto,
  CreateUserResponseDto,
  SaveLoginRequestDto,
  UserDto,
  UserLoginRequestDto,
  UserLoginResponseDto,
} from '@/dto';
import { UserRequestDto, UserResponseDto } from './dto/auth-register.dto';

export interface IAuthService {
  register(userRequest: UserRequestDto): Promise<any>;
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

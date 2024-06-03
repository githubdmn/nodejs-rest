import {
  Body,
  Controller,
  Post,
  UseFilters,
  UseGuards,
  Response,
} from '@nestjs/common';
import { AuthController } from './auth.controller';
import {
  CreateUserRequestDto,
  CreateUserResponseDto,
  LoginRequestDto,
  LoginResponseDto,
} from './dto';
import { UserRegisterRequestDto } from '@/dto';
import { GeneralFilter, UserExistsException } from '@/exceptions';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth/user')
export class AuthUserController extends AuthController {
  @Post()
  @UseFilters(GeneralFilter)
  async register(
    @Body() userRequest: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    const user: UserRegisterRequestDto = {
      email: userRequest.email,
      password: userRequest.password,
      firstName: userRequest.firstName,
      lastName: userRequest.lastName,
    };

    const userExists = await this.authService.userExists(user.email);
    if (userExists) {
      throw new UserExistsException(`User with the email ${user.email}`);
    }

    const registeredUser = await this.authService.registerUser(user);

    return {
      userId: registeredUser.userId,
      email: registeredUser.email,
      firstName: registeredUser.firstName,
      lastName: registeredUser.lastName,
      createdAt: registeredUser.createdAt,
    } as CreateUserResponseDto;
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(
    @Body() email: string,
    @Response() response: any,
  ): Promise<LoginResponseDto> {
    const { accessToken, refreshToken } =
      await this.authService.loginUser(email);
    return response
      .set('access_token', accessToken)
      .set('refresh_token', refreshToken)
      .json({ message: 'Login successful' });
  }
}

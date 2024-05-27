import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthController } from './auth.controller';
import {
  CreateUserRequestDto,
  CreateUserResponseDto,
} from './dto/auth-register.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserRegisterRequestDto } from '@/dto';

@Controller('auth/user')
export class AuthUserController extends AuthController {
  //@UseGuards(AuthGuard('local'))
  @Post()
  async register(
    @Body() userRequest: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {

    const user: UserRegisterRequestDto = {
      email: userRequest.email,
      password: userRequest.password,
      firstName: userRequest.firstName,
      lastName: userRequest.lastName,
    };

    const userResponse = await this.authService.registerUser(user);

    return {
      userId: userResponse.userId,
      email: userResponse.email,
      firstName: userResponse.firstName,
      lastName: userResponse.lastName,
      createdAt: userResponse.createdAt,
    };
  }
}

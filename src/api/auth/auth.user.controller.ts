import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CreateUserRequestDto, CreateUserResponseDto } from './dto';
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

    const registeredUser = await this.authService.registerUser(user);

    return {
      userId: registeredUser.userId,
      email: registeredUser.email,
      firstName: registeredUser.firstName,
      lastName: registeredUser.lastName,
      createdAt: registeredUser.createdAt,
    } as CreateUserResponseDto;
  }
}

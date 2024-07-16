import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CreateUserRequestDto, CreateUserResponseDto } from './dto';
import { UserRegisterRequestDto } from '@/dto';
import { GeneralFilter, UserExistsException } from '@/exceptions';

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

    const registeredUser = await this.userDB.register(user);

    return {
      userId: registeredUser.userId,
      email: registeredUser.email,
      firstName: registeredUser.firstName,
      lastName: registeredUser.lastName,
      createdAt: registeredUser.createdAt,
    } as CreateUserResponseDto;
  }
}

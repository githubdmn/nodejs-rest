import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { AuthController } from '../auth.controller';
import { RegisterEndUserRequestDto } from '../dto';
import { EndUserRegisterRequestDto } from '@/common/dto';
import { GeneralFilter, UserExistsException } from '@/exceptions';

@Controller('auth/user')
export class AuthUserController extends AuthController {
  @Post()
  @UseFilters(GeneralFilter)
  async register(@Body() userRequest: RegisterEndUserRequestDto): Promise<any> {
    const user: EndUserRegisterRequestDto = {
      email: userRequest.email,
      password: userRequest.password,
      name: userRequest.firstName,
    };

    const registeredUser = await this.userDB.register(user);

    return {
      userId: registeredUser.userId,
      email: registeredUser.email,
      name: registeredUser.firstName,
      createdAt: registeredUser.createdAt,
    };
  }
}

import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CreateUserRequestDto, UserRequestDto } from './dto/auth-register.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class AuthUserController extends AuthController {
  @UseGuards(AuthGuard('local'))
  @Post()
  async register(@Body() user: CreateUserRequestDto): Promise<any> {
    return await this.authService.register(user);
  }
}

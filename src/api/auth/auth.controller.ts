import {
  Body,
  Controller,
  Post,
  Inject,
  UseGuards,
  Request,
  Response,
  UseInterceptors,
  Get,
  Headers,
} from '@nestjs/common';
import { IAuthService } from './auth.interface';
import { AUTH_SERVICE } from '@/utils/constants';
import { SerializeExclude } from '@/interceptor';
import {
  ChangePasswordRequestDto,
  CreateUserRequestDto,
  CreateUserResponseDto,
  UserDto,
  UserLoginRequestDto,
  UserLoginResponseDto,
} from '@/dto';
import {
  LoginRequestDto,
  LoginResponseDto,
  UserRegistrationRequestDto,
  UserRegistrationResponseDto,
} from './dto';
import { AuthGuard as CustomAuthGuard } from '@/guard';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(CustomAuthGuard)
export abstract class AuthController {
  constructor(@Inject(AUTH_SERVICE) protected authService: IAuthService) {}

  abstract register(
    user: UserRegistrationRequestDto,
  ): Promise<UserRegistrationResponseDto>;

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(
    @Body() userLogin: LoginRequestDto,
    @Response() response: any,
  ): Promise<LoginResponseDto> {
    const user = await this.authService.login();
    if (!user) return response.json({ error: 'invalid credentials' });
    return response
      .set('access_token', user.accessToken)
      .set('refresh_token', user.refreshToken)
      .json({ id: user.id, email: userLogin.email });
  }

  @Post('change-password')
  async changePassword(
    @Body() { oldPassword, newPassword }: ChangePasswordRequestDto,
    @Request() request: any,
  ): Promise<string> {
    const updated = await this.authService.changePassword(
      request.user.sub,
      oldPassword,
      newPassword,
    );
    return 'Password successfully changed';
  }

  @Get('logout')
  async logout(
    @Headers('refresh_token') refreshToken: string,
    @Response() res: any,
  ): Promise<UserLoginResponseDto> {
    await this.authService.logout(refreshToken);
    return res
      .set('access_token', '')
      .set('refresh_token', '')
      .json({ message: 'Logout successfully' });
  }

  @Get('refresh-token')
  async refreshAccessToken(
    @Request() req: any,
    @Response() res: any,
  ): Promise<UserLoginResponseDto> {
    const refreshToken = req.headers.refresh_token;
    const data = await this.authService.refreshToken(
      { userId: req.user.sub, email: req.user.username },
      refreshToken,
    );
    return res
      .set('access_token', data.accessToken)
      .set('refresh_token', data.refreshToken)
      .json({
        id: data.id,
        email: req.user.username,
      }) as UserLoginResponseDto;
  }
}

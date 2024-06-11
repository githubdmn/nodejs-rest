import {
  Body,
  Post,
  Inject,
  UseGuards,
  Request,
  Response,
  Get,
  Headers,
} from '@nestjs/common';
import { IAuthService } from './auth.interface';
import { AUTH_SERVICE } from '@/utils/constants';
import {
  UserRegistrationRequestDto,
  UserRegistrationResponseDto,
  ChangePasswordRequestDto,
  LoginResponseDto,
  LoginRequestDto,
} from './dto';
import { AuthGuard } from '@/guard';

@UseGuards(AuthGuard)
export abstract class AuthController {
  constructor(@Inject(AUTH_SERVICE) protected authService: IAuthService) {}

  abstract register(
    user: UserRegistrationRequestDto,
  ): Promise<UserRegistrationResponseDto>;

  @Post('login')
  async login(
    @Body() login: LoginRequestDto,
    @Response() response: any,
  ): Promise<LoginResponseDto> {
    const isAdmin: boolean = login.userType === 'admin' ? true : false;
    const { accessToken, refreshToken } = await this.authService.loginUser(
      isAdmin,
      login.email,
    );
    return response
      .set('access_token', accessToken)
      .set('refresh_token', refreshToken)
      .json({ message: 'Login successful' });
  }

  @Post('change-password')
  async changePassword(
    @Body() { userType, password, newPassword }: ChangePasswordRequestDto,
    @Request() request: any,
  ): Promise<string> {
    const isAdmin: boolean = userType === 'admin' ? true : false;
    const updated = await this.authService.changePassword(
      isAdmin,
      request.user.sub,
      password,
      newPassword,
    );
    return updated
      ? 'Password successfully changed'
      : "Password couldn't be changed";
  }

  @Get('logout')
  async logout(
    @Headers('refresh_token') refreshToken: string,
    @Response() res: any,
  ): Promise<string> {
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
  ): Promise<any> {
    const refreshToken = req.headers.refresh_token;

    const data = await this.authService.refreshAccessToken(
      req.user.sub,
      req.user.username,
      refreshToken,
    );

    return res
      .set('access_token', data.accessToken)
      .set('refresh_token', data.refreshToken)
      .json({
        id: req.user.sub,
        email: req.user.username,
      });
  }
}

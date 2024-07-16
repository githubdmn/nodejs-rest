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
import { AUTH_SERVICE, SQLITE_AUTH_USER } from '@/utils/constants';
import {
  ChangePasswordRequestDto,
  LoginResponseDto,
  LoginRequestDto,
  RegistrationRequestBaseDto,
  RegistrationResponseBaseDto,
} from './dto';
import { AuthGuard } from '@/guard';
import { IUserAuth } from '@/database/interfaces';

@UseGuards(AuthGuard)
export abstract class AuthController {
  constructor(
    @Inject(AUTH_SERVICE) protected authService: IAuthService,
    @Inject(SQLITE_AUTH_USER) protected userDB: IUserAuth,
  ) {}

  abstract register(user: any): Promise<any>;

  @Post('login')
  async login(
    @Body() login: LoginRequestDto,
    @Response() response: any,
  ): Promise<LoginResponseDto> {
    const isAdmin: boolean = true;
    const { accessToken, refreshToken } = await this.authService.login(
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
    @Body() { password, newPassword }: ChangePasswordRequestDto,
    @Request() request: any,
    @Response() response: any,
  ): Promise<string> {
    const isAdmin: boolean = false;
    const updated = await this.authService.changePassword(
      isAdmin,
      request.user.sub,
      password,
      newPassword,
    );
    return updated
      ? response.json({ message: 'Password successfully changed' })
      : response.json({ message: "Password couldn't be changed" });
  }

  @Get('password-reset')
  async passwordReset(
    @Request() req: any,
    @Response() response: any,
  ): Promise<string> {
    return response.json({ message: 'Method not implemented.' });
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

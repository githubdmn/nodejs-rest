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
import { UserLoginResponseDto } from '@/dto';
import {
  UserRegistrationRequestDto,
  UserRegistrationResponseDto,
  ChangePasswordRequestDto,
} from './dto';
import { AuthGuard } from '@/guard';

@UseGuards(AuthGuard)
export abstract class AuthController {
  constructor(@Inject(AUTH_SERVICE) protected authService: IAuthService) {}

  abstract register(
    user: UserRegistrationRequestDto,
  ): Promise<UserRegistrationResponseDto>;

  abstract login(email: string, response: any): any;

  abstract changePassword(
    { password, newPassword }: ChangePasswordRequestDto,
    request: any,
  ): Promise<string>;

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
  ): Promise<any> {
    // const refreshToken = req.headers.refresh_token;
    // const data = await this.authService.refreshToken(
    //   { userId: req.user.sub, email: req.user.username },
    //   refreshToken,
    // );
    // return res
    //   .set('access_token', data.accessToken)
    //   .set('refresh_token', data.refreshToken)
    //   .json({
    //     id: data.id,
    //     email: req.user.username,
    //   }) as UserLoginResponseDto;
  }
}

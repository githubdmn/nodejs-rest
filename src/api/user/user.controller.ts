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
import { IUser } from './user.interface';
import { USER_SERVICE } from '@/utils/constants';
import { SerializeExclude } from '@/interceptor';
import {
  ChangePasswordRequestDto,
  CreateUserRequestDto,
  CreateUserResponseDto,
  UserLoginRequestDto,
  UserLoginResponseDto,
} from '@/dto';
import { UserGuard } from '@/guard';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('User')
@UseGuards(UserGuard)
@Controller('user')
export class UserController {
  constructor(@Inject(USER_SERVICE) private userService: IUser) {}

  @Post()
  @SerializeExclude(CreateUserResponseDto)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiCreatedResponse({ type: CreateUserResponseDto })
  async register(
    @Body() user: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    return await this.userService.register(user);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login as a user' })
  @ApiOkResponse({ description: 'Successfully logged in' })
  @ApiResponse({ status: 400, description: 'Invalid credentials' })
  async login(
    @Body() userLogin: UserLoginRequestDto,
    @Response() response: any,
  ): Promise<UserLoginResponseDto> {
    const user = await this.userService.getJwt(userLogin);
    if (user.id === 0) return response.json({ error: 'invalid credentials' });
    return response
      .set('access_token', user.accessToken)
      .set('refresh_token', user.refreshToken)
      .json({ id: user.id, email: userLogin.email });
  }

  @Post('change-password')
  @ApiOperation({ summary: 'change password ' })
  @ApiOkResponse({ description: 'Password changed successfully' })
  @ApiResponse({ status: 400, description: 'Invalid credentials' })
  async resetPassword(
    @Body() { oldPassword, newPassword }: ChangePasswordRequestDto,
    @Request() request: any,
  ): Promise<string> {
    const updated = await this.userService.resetPassword(
      request.user.sub,
      oldPassword,
      newPassword,
    );
    return 'Password successfully changed';
  }

  @Get('logout')
  @ApiOkResponse({ description: 'Successfully logged out' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async logout(
    @Headers('refresh_token') refreshToken: string,
    @Response() res: any,
  ): Promise<UserLoginResponseDto> {
    await this.userService.logout(refreshToken);
    return res
      .set('access_token', '')
      .set('refresh_token', '')
      .json({ message: 'Logout successfully' });
  }

  @Get('refresh-token')
  @ApiOkResponse({
    description: 'Successfully refreshed access token',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async refreshAccessToken(
    @Request() req: any,
    @Response() res: any,
  ): Promise<UserLoginResponseDto> {
    const refreshToken = req.headers.refresh_token;
    const data = await this.userService.refreshToken(
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

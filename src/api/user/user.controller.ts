import {
  Body,
  Controller,
  Post,
  Inject,
  UseGuards,
  Request,
  Response,
  UseInterceptors,
} from '@nestjs/common';
import { IUser } from './user.interface';
import { USER_SERVICE } from '@/utils/constants';
import { JwtInterceptor, SerializeExclude } from '@/interceptor';
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
} from '@nestjs/swagger';

@ApiTags('User')
@UseGuards(UserGuard)
@UseInterceptors(JwtInterceptor)
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
      request.jwtPayload.sub,
      oldPassword,
      newPassword,
    );
    return 'Password successfully changed';
  }
}

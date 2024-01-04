import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  Headers,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { IUser } from './user.interface';
import { USER_SERVICE } from '@/constants/instances.constants';
import { SerializeExclude } from '@/interceptor';
import { CreateUserRequest, CreateUserResponse, UserLoginRequest } from '@/dto';
import User from '@/entities/user.entity';
import { UserGuard } from '@/guard';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('User')
@UseGuards(UserGuard)
@Controller('user')
export class UserController {
  constructor(@Inject(USER_SERVICE) private userService: IUser) {}

  @Post()
  @SerializeExclude(CreateUserResponse)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiCreatedResponse({ type: CreateUserResponse })
  async register(@Body() user: CreateUserRequest): Promise<User> {
    return await this.userService.register(user);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login as a user' })
  @ApiOkResponse({ description: 'Successfully logged in' })
  @ApiResponse({ status: 400, description: 'Invalid credentials' })
  async login(@Body() userLogin: UserLoginRequest, @Res() response: any) {
    const customer = await this.userService.getJwt(userLogin);
    if (customer.id === 0)
      return response.json({ error: 'invalid credentials' });
    return response
      .set('access_token', customer.accessToken)
      .set('refresh_token', customer.refreshToken)
      .json({ id: customer.id });
  }
}

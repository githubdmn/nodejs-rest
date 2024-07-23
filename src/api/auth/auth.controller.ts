import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Response,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AUTH_ENDUSER_FIREBASE_SERVICE } from '@/common/constants';
import { AuthGuard } from '@/guard';
import { IAuthService } from './auth.interface';
import { EndUserRegisterRequestDto } from '@/common/dto';
import { GeneralFilter } from '@/exceptions';
import { RegisterEndUserRequestDto } from './dto';

@UseGuards(AuthGuard)
@Controller('auth')
export class EndUserAuthController {
  constructor(
    @Inject(AUTH_ENDUSER_FIREBASE_SERVICE) protected authService: IAuthService,
  ) {}

  @Post('register')
  @UseFilters(GeneralFilter)
  async register(
    @Body() userRequest: RegisterEndUserRequestDto,
    @Response() response: any,
  ): Promise<any> {
    const userData: Partial<EndUserRegisterRequestDto> = {
      email: userRequest.email,
      password: userRequest.password,
      name: userRequest.firstName + ' ' + userRequest.lastName,
    };

    const { accessToken, refreshToken, user } =
      await this.authService.register(userData);

    response
      .setHeader('access-token', accessToken)
      .setHeader('refresh-token', refreshToken)
      .status(HttpStatus.OK)
      .send(user);
  }
}

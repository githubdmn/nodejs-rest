import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterRequestDto } from '@/dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  // async validate(
  //   email: string,
  //   password: string,
  // ): Promise<UserRegisterRequestDto> {
  //   const user = await this.authService.validateUser(email, password); // does the email exist in the database?
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //   return user;
  // }
}
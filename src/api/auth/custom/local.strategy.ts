import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AUTH_SERVICE } from '@/utils/constants';
import { IAuthService } from '../auth.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(AUTH_SERVICE) protected authService: IAuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser({
      email: username,
      password,
    });
    if (!user) {
      throw new UnauthorizedException({ message: 'Invalid credentials' });
    }
    return user;
  }
}


import { SQLITE_AUTH_USER } from '@/common/constants';
import { Injectable, Inject } from '@nestjs/common';
import { IAuthService } from '../auth.interface';
import { IUserDBAuth } from '@/database/interfaces';

@Injectable()
export class AuthUserService implements IAuthService {
  constructor(
    @Inject(SQLITE_AUTH_USER) private userdb: IUserDBAuth,
  ) {}

  async register(
    userRequest: any,
  ): Promise<any> {
    return await this.userdb.register(userRequest);
  }
}

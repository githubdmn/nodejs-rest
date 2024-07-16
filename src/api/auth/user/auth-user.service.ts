
import { SQLITE_AUTH_USER } from '@/common/constants';
import { Injectable, Inject } from '@nestjs/common';
import { IUserAuth } from './auth-user.interface';
import { IUserDBAuth } from '@/database/interfaces';

@Injectable()
export class AuthUserService implements IUserAuth {
  constructor(
    @Inject(SQLITE_AUTH_USER) private userdb: IUserDBAuth,
  ) {}

  async register(
    userRequest: any,
  ): Promise<any> {
    return await this.userdb.register(userRequest);
  }
}

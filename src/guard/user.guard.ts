import { Injectable } from '@nestjs/common';
import { BaseGuard } from './base.guard';

const userRegister = '/api/user';
const userLogin = '/api/user/login';

@Injectable()
export class UserGuard extends BaseGuard {
  protected allowedMethods = ['POST'];
  protected allowedUrls = [userRegister, userLogin];
}

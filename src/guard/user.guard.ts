import { Injectable } from '@nestjs/common';
import { BaseGuard } from './base.guard';
import { env } from '@/conf';

const userRegister = '/api/user';
const userLogin = '/api/user/login';

@Injectable()
export class UserGuard extends BaseGuard {
  protected allowedMethods = ['POST'];
  protected allowedUrls = [userRegister, userLogin];
  protected envJwtAccess = env.jwtAccess;
}

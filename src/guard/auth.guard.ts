import { Injectable } from '@nestjs/common';
import { BaseGuard } from './base.guard';
import { env } from '@/conf';

const apiv1 = [
  '/api/v1/auth/user',
  '/api/v1/auth/user/login',
  '/api/v1/auth/admin',
  '/api/v1/auth/admin/login',
];

@Injectable()
export class AuthGuard extends BaseGuard {
  protected allowedMethods = ['POST'];
  protected allowedUrls = [...apiv1];
  protected envJwtAccess = env.jwtAccess;
}

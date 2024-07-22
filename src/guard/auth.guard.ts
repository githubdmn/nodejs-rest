import { Injectable } from '@nestjs/common';
import { BaseGuard } from './base.guard';
import { env } from '@/conf';

const apiv1 = [
  '/api/v1/auth/register',
  '/api/v1/auth/login',
];

@Injectable()
export class AuthGuard extends BaseGuard {
  protected allowedMethods = ['POST'];
  protected allowedUrls = [...apiv1];
  protected envJwtAccess = env.jwtAccess;
}

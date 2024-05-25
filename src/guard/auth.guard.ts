import { Injectable } from '@nestjs/common';
import { BaseGuard } from './base.guard';
import { env } from '@/conf';

@Injectable()
export class AuthGuard extends BaseGuard {
  protected allowedMethods = [];
  protected allowedUrls = [];
  protected envJwtAccess = env.jwtAccess;
}

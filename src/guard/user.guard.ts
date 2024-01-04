import { BaseGuard } from './base.guard';

export class UserGuard extends BaseGuard {
  allowedMethods = ['POST'];
  allowedUrls = ['api/user', 'api/user/login'];
}

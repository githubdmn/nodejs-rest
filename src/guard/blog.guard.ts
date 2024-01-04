import { BaseGuard } from './base.guard';

export class BlogGuard extends BaseGuard {
  allowedMethods = ['GET'];
  allowedUrls = ['api/blog', 'api/blog/get-all'];
}

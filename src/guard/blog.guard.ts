import { Injectable } from '@nestjs/common';
import { BaseGuard } from './base.guard';

const getBlog = '/api/blog';
const getBlogs = '/api/blog/get-all';

@Injectable()
export class BlogGuard extends BaseGuard {
  protected allowedMethods = ['GET'];
  protected allowedUrls = [getBlog, getBlogs];
}

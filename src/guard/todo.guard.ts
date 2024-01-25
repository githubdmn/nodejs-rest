import { Injectable } from '@nestjs/common';
import { BaseGuard } from './base.guard';

@Injectable()
export class TodoGuard extends BaseGuard {
  protected allowedMethods = [];
  protected allowedUrls = [];
}

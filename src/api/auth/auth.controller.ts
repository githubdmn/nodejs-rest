import {
  Body,
  Post,
  Inject,
  UseGuards,
  Request,
  Response,
  Get,
  Headers,
} from '@nestjs/common';
import { SQLITE_AUTH_USER } from '@/utils/constants';
import { AuthGuard } from '@/guard';
import { IUserDBAuth } from '@/database/interfaces';

@UseGuards(AuthGuard)
export abstract class AuthController {
  constructor(
    @Inject(SQLITE_AUTH_USER) protected userDB: IUserDBAuth,
  ) {}

  abstract register(user: any): Promise<any>;

}

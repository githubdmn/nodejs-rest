import { IUserAuth } from '@/database/interfaces';
import { UserRegisterRequestDto, UserRegisterResponseDto } from '@/dto';
import { SQLITE_AUTH_USER } from '@/utils/constants';
import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements IUserAuth {
  constructor(
    @Inject(SQLITE_AUTH_USER) private uerDB: IUserAuth,
  ) {}

  async register(
    userRequest: UserRegisterRequestDto,
  ): Promise<UserRegisterResponseDto> {
    return await this.uerDB.register(userRequest);
  }
}

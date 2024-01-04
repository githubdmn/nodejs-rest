import { Inject, Injectable } from '@nestjs/common';
import { IUser } from './user.interface';
import { CreateUserRequest } from '@/dto';
import UserLoginRequest from '@/dto/userLogin.request.dto';
import { JwtService } from '@nestjs/jwt';
import UserLoginResponse from '@/dto/userLogin.response.dto';
import { IUserDatabase } from '@/database/database.inteface';
import { MONGODB_USER, POSTGRES_USER } from '@/constants/instances.constants';
import { env } from '@/conf';
import { UserEntity } from '@/entities';
import { checkHashedValue } from '@/utils';

const DB_USER = env.dbUse === 'postgres' ? POSTGRES_USER : MONGODB_USER;

@Injectable()
export class UserService implements IUser {
  constructor(
    @Inject(DB_USER) private userDatabase: IUserDatabase,
    private jwtService: JwtService,
  ) {}

  async register(user: CreateUserRequest): Promise<UserEntity> {
    return await this.userDatabase.save(user);
  }

  private async getAuthenticatedUser(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.userDatabase.findUserByEmail(email);
    if (user == null) return null;
    else {
      const check = await checkHashedValue(user.password, password);
      if (check == null) return null;
    }
    return user;
  }

  async getJwt({
    email,
    password,
  }: UserLoginRequest): Promise<UserLoginResponse> {
    const user = await this.getAuthenticatedUser(email, password);
    if (user) {
      const accessToken = await this.jwtService.signAsync(
        { username: user.email, sub: user.userId },
        {
          expiresIn: '1h',
          secret: env.jwtAccess,
        },
      );
      const refreshToken = await this.jwtService.signAsync(
        { username: user.email, sub: user.userId },
        {
          expiresIn: '1d',
          secret: env.jwtAccess,
        },
      );
      return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        id: Number(user.userId),
      } as UserLoginResponse;
    } else
      return {
        accessToken: '',
        refreshToken: '',
        id: 0,
      } as UserLoginResponse;
  }
}

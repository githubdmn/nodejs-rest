import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUser } from './user.interface';
import {
  CreateUserRequestDto,
  CreateUserResponseDto,
  UserDto,
  UserLoginRequestDto,
  UserLoginResponseDto,
} from '@/dto';
import { JwtService } from '@nestjs/jwt';
import { IUserDatabase } from '@/database/database.inteface';
import { POSTGRES_USER } from '@/utils/constants';
import { env } from '@/conf';
import { checkHashedValue } from '@/utils';

const DB_USER = POSTGRES_USER; //env.dbUse === 'postgres' ? POSTGRES_USER : MONGODB_USER;

@Injectable()
export class UserService implements IUser {
  constructor(
    @Inject(DB_USER) private userDatabase: IUserDatabase,
    private jwtService: JwtService,
  ) {}

  async register(user: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    return await this.userDatabase.save(user);
  }

  private async getAuthenticatedUser(
    email: string,
    password: string,
  ): Promise<UserDto> {
    const user = await this.userDatabase.findUserByEmail(email);
    if (user == null)
      throw new NotFoundException(`User with email ${email} is not found`);
    else {
      const check = await checkHashedValue(user.password, password);
      if (check == null) throw new BadRequestException('Invalid password');
    }
    return user;
  }

  async getJwt({
    email,
    password,
  }: UserLoginRequestDto): Promise<UserLoginResponseDto> {
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
      } as UserLoginResponseDto;
    } else
      return {
        accessToken: '',
        refreshToken: '',
        id: 0,
      } as UserLoginResponseDto;
  }
}

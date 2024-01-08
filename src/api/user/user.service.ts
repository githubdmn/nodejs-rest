import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IUser } from './user.interface';
import {
  CreateUserRequestDto,
  CreateUserResponseDto,
  SaveLoginRequestDto,
  UpdateUserResponseDto,
  UserDto,
  UserLoginRequestDto,
  UserLoginResponseDto,
} from '@/dto';
import { JwtService } from '@nestjs/jwt';
import { IAuth, IUserDatabase } from '@/database/database.inteface';
import { POSTGRES_AUTH, POSTGRES_USER } from '@/utils/constants';
import { env } from '@/conf';
import { checkHashedValue, hashString } from '@/utils';

const DB_USER = POSTGRES_USER; //env.dbUse === 'postgres' ? POSTGRES_USER : MONGODB_USER;
const DB_AUTH = POSTGRES_AUTH;

@Injectable()
export class UserService implements IUser {
  constructor(
    @Inject(DB_USER) private userDatabase: IUserDatabase,
    @Inject(DB_AUTH) private authDatabase: IAuth,
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

  private async getAuthenticatedUserById(
    userId: string,
    password: string,
  ): Promise<UserDto> {
    const user = await this.userDatabase.findUserByUserId(userId);
    if (user == null)
      throw new NotFoundException(`User with email ${userId} is not found`);
    else {
      const check = await checkHashedValue(user.password, password);
      if (check == false) throw new BadRequestException('Invalid credentials');
    }
    return user;
  }

  async getJwt({
    email,
    password,
  }: UserLoginRequestDto): Promise<UserLoginResponseDto> {
    try {
      const user = await this.getAuthenticatedUser(email, password);
      if (user) {
        const accessToken = await this.generateToken(user, '1h', env.jwtAccess);
        const refreshToken = await this.generateToken(
          user,
          '1d',
          env.jwtRefresh,
        );
        const currentDate = new Date(new Date().getDate() + 1);
        const saveLogin: SaveLoginRequestDto = {
          refreshToken: refreshToken,
          expiryDate: currentDate,
          revoked: false,
          userId: user.userId.toString(),
        };
        const saved = this.authDatabase.saveLogin(saveLogin);
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
    } catch (error: any) {
      throw new HttpException(
        `Failed to login ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async resetPassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<UpdateUserResponseDto> {
    const user = await this.getAuthenticatedUserById(userId, oldPassword);
    const newPasswordHash = await hashString(newPassword);
    return this.userDatabase.updateUser(userId, { password: newPasswordHash });
  }

  async logout(refreshToken: string): Promise<UserLoginResponseDto> {
    await this.authDatabase.logout(refreshToken);
    return {
      accessToken: '',
      refreshToken: '',
      id: 0,
    } as UserLoginResponseDto;
  }

  async refreshToken(
    user: Partial<UserDto>,
    refreshToken: string,
  ): Promise<UserLoginResponseDto> {
    try {
      if (!user.userId) throw new Error('User ID is not assigned');
      const auth = await this.authDatabase.findAuthByRefreshToken(refreshToken);
      const accessToken = await this.generateToken(user, '1h', env.jwtAccess);
      return {
        accessToken,
        refreshToken,
        id: user.userId,
      };
    } catch (error) {
      throw new HttpException(
        `Auth error: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async generateToken(
    user: Partial<UserDto>,
    time: string,
    secret: string,
  ) {
    return await this.jwtService.signAsync(
      { username: user.email, sub: user.userId },
      {
        expiresIn: time,
        secret: secret,
      },
    );
  }
}

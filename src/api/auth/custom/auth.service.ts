import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  AdminRegisterRequestDto,
  AdminRegisterResponseDto,
  CredentialsDto,
  UserRegisterRequestDto,
  UserRegisterResponseDto,
} from '@/dto';
import { POSTGRES_AUTH, POSTGRES_USER } from '@/utils/constants';
import { env } from '@/conf';
import { RefreshTokenResponseDto } from '../dto';
import entities from './entities';

const DB_USER = POSTGRES_USER;
const DB_AUTH = POSTGRES_AUTH;

@Injectable()
export class AuthService {
  // constructor(
  //   @Inject(DB_AUTH) private authDatabase: IAuth,
  //   private jwtService: JwtService,
  // ) {}

  // async registerUser(
  //   userRequest: UserRegisterRequestDto,
  // ): Promise<UserRegisterResponseDto> {
  //   return await this.authDatabase.saveUser(userRequest);
  // }

  // async registerAdmin(
  //   user: AdminRegisterRequestDto,
  // ): Promise<AdminRegisterResponseDto> {
  //   return await this.authDatabase.saveAdmin(user);
  // }

  // async userExists(email: string): Promise<boolean> {
  //   return await this.authDatabase.userExists(email);
  // }

  // async validateUser(credentials: CredentialsDto): Promise<boolean> {
  //   return await this.authDatabase.checkCredentials(credentials);
  // }

  // async loginUser(
  //   isAdmin: boolean,
  //   email: string,
  // ): Promise<RefreshTokenResponseDto> {
  //   const userId = isAdmin
  //     ? await this.authDatabase.getAdminIdByEmail(email)
  //     : await this.authDatabase.getUserIdByEmail(email);

  //   const { accessToken, refreshToken } = await this.generateLoginTokens(
  //     userId,
  //     email,
  //   );
  //   await this.authDatabase.saveRefreshToken(isAdmin, refreshToken, userId);
  //   return { accessToken, refreshToken };
  // }

  // async logout(refreshToken: string): Promise<string> {
  //   await this.authDatabase.deleteRefreshToken(refreshToken);
  //   return 'Logout successful';
  // }

  // private async generateLoginTokens(id: string, email: string) {
  //   const accessToken = await this.generateToken(
  //     id,
  //     email,
  //     env.accessTokenExpiration,
  //     env.jwtAccess,
  //   );
  //   const refreshToken = await this.generateToken(
  //     id,
  //     email,
  //     env.refreshTokenExpiration,
  //     env.jwtRefresh,
  //   );

  //   return { accessToken, refreshToken };
  // }

  // async refreshAccessToken(
  //   id: string,
  //   email: string,
  //   refreshToken: string,
  // ): Promise<RefreshTokenResponseDto> {
  //   const valid = await this.authDatabase.checkRefreshToken(refreshToken);

  //   if (!valid) {
  //     throw new Error('Invalid refresh token');
  //   }

  //   const accessToken = await this.generateToken(
  //     id,
  //     email,
  //     env.accessTokenExpiration,
  //     env.jwtAccess,
  //   );

  //   return { accessToken, refreshToken };
  // }

  // async changePassword(
  //   isAdmin: boolean,
  //   userId: string,
  //   password: string,
  //   newPassword: string,
  // ): Promise<boolean> {
  //   return this.authDatabase.changePassword(
  //     isAdmin,
  //     userId,
  //     password,
  //     newPassword,
  //   );
  // }

  // private async generateToken(
  //   id: string,
  //   email: string,
  //   time: number,
  //   secret: string,
  // ): Promise<string> {
  //   return await this.jwtService.signAsync(
  //     { username: email, sub: id },
  //     {
  //       expiresIn: time,
  //       secret: secret,
  //     },
  //   );
  // }
}

import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuth, IUserDatabase } from '@/database/database.inteface';
import {
  AdminRegisterRequestDto,
  AdminRegisterResponseDto,
  CredentialsDto,
  UserDto,
  UserLoginResponseDto,
  UserRegisterRequestDto,
  UserRegisterResponseDto,
} from '@/dto';
import { POSTGRES_AUTH, POSTGRES_USER } from '@/utils/constants';
import { hashString } from '@/utils';
import { env } from '@/conf';

const DB_USER = POSTGRES_USER;
const DB_AUTH = POSTGRES_AUTH;

@Injectable()
export class AuthService {
  constructor(
    @Inject(DB_USER) private userDatabase: IUserDatabase,
    @Inject(DB_AUTH) private authDatabase: IAuth,
    private jwtService: JwtService,
  ) {}

  async registerUser(
    userRequest: UserRegisterRequestDto,
  ): Promise<UserRegisterResponseDto> {
    return await this.authDatabase.saveUser(userRequest);
  }

  async registerAdmin(
    user: AdminRegisterRequestDto,
  ): Promise<AdminRegisterResponseDto> {
    return await this.authDatabase.saveAdmin(user);
  }

  async userExists(email: string): Promise<boolean> {
    return await this.authDatabase.userExists(email);
  }

  async validateUser(credentials: CredentialsDto): Promise<boolean> {
    return await this.authDatabase.checkCredentials(credentials);
  }

  async loginUser(email: string) {
    const userId = await this.authDatabase.getUserIdByEmail(email);
    const { accessToken, refreshToken } = await this.generateLoginTokens(
      userId,
      email,
    );
    // save refresh token to DB
    // const currentDate = new Date();
    // currentDate.setDate(currentDate.getDate() + 1);
    return { accessToken, refreshToken, userId };
  }

  
  // const saveLogin: SaveLoginRequestDto = {
    //   refreshToken: refreshToken,
    //   expiryDate: currentDate,
    //   revoked: false,
    //   userId: user.userId.toString(),
    // };


  private async generateLoginTokens(id: string, email: string) {
    const accessToken = await this.generateToken(
      id,
      email,
      env.accessTokenExpiration,
      env.jwtAccess,
    );
    const refreshToken = await this.generateToken(
      id,
      email,
      env.refreshTokenExpiration,
      env.jwtRefresh,
    );

    return { accessToken, refreshToken };
    
  }

  // async getJwt({
  //   email,
  // }: UserLoginRequestDto): Promise<UserLoginResponseDto> {
  //   const user = await this.getAuthenticatedUser(email, password);
  //   if (user) {
  //     const accessToken = await this.generateToken(user, '1h', env.jwtAccess);
  //     const refreshToken = await this.generateToken(user, '1d', env.jwtRefresh);
  //     const currentDate = new Date(new Date().getDate() + 1);
  //     const saveLogin: SaveLoginRequestDto = {
  //       refreshToken: refreshToken,
  //       expiryDate: currentDate,
  //       revoked: false,
  //       userId: user.userId.toString(),
  //     };
  //     // const saved = this.authDatabase.saveLogin(saveLogin);
  //     return {
  //       accessToken: accessToken,
  //       refreshToken: refreshToken,
  //       id: Number(user.userId),
  //     } as UserLoginResponseDto;
  //   } else
  //     return {
  //       accessToken: '',
  //       refreshToken: '',
  //       id: 0,
  //     } as UserLoginResponseDto;
  // }

  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<string> {
    throw new Error('Method not implemented.');
    // const user = await this.getAuthenticatedUserById(userId, oldPassword);
    const newPasswordHash = await hashString(newPassword);
    // await this.userDatabase.update({ password: newPasswordHash });
    return 'Password successfully changed';
  }

  async logout(refreshToken: string): Promise<string> {
    throw new Error('Method not implemented.');
    // await this.authDatabase.logout(refreshToken);
    return 'Logout successfully';
  }

  async refreshToken(
    user: Partial<UserDto>,
    refreshToken: string,
  ): Promise<UserLoginResponseDto> {
    throw new Error('Method not implemented.');
    // try {
    //   if (!user.userId) throw new Error('User ID is not assigned');
    //   const auth = await this.authDatabase.findAuthByRefreshToken(refreshToken);
    //   const accessToken = await this.generateToken(user, '1h', env.jwtAccess);
    //   return {
    //     accessToken,
    //     refreshToken,
    //     id: user.userId,
    //   };
    // } catch (error) {
    //   throw new HttpException(
    //     `Auth error: ${error}`,
    //     HttpStatus.INTERNAL_SERVER_ERROR,
    //   );
    // }
  }

  private async generateToken(
    id: string,
    email: string,
    time: number,
    secret: string,
  ): Promise<string> {
    return await this.jwtService.signAsync(
      { username: email, sub: id },
      {
        expiresIn: time,
        secret: secret,
      },
    );
  }
}

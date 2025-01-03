import { Inject, Injectable } from '@nestjs/common';
import { AUTH_CUSTOM_ADMIN_REPOSITORY } from '../../constants';
import { AdminRepository } from '../../repository';
import { JwtService } from '@nestjs/jwt';
import { env } from '@/conf';

@Injectable()
export default class CustomAuthAdminServiceImplementation {
  constructor(
    @Inject(AUTH_CUSTOM_ADMIN_REPOSITORY)
    private adminRepository: AdminRepository,
    private jwtService: JwtService,
  ) {}

  async registerAdmin(adminData: any): Promise<any> {
    const savedAdmin = await this.adminRepository.createAdmin(adminData);
    return savedAdmin;
  }

  generateAdminJWT(
    adminId: string,
    role: string,
  ): { accessToken: string; refreshToken: string } {
    const payload = { sub: adminId, role: role };

    const accessToken = this.jwtService.sign(payload, {
      secret: env.jwtAccessAdmin,
      expiresIn: env.accessTokenExpirationAdmin,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: env.jwtRefreshAdmin,
      expiresIn: env.refreshTokenExpirationAdmin,
    });

    return { accessToken, refreshToken };
  }

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

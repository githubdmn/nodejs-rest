import { IAuth } from '@/database/database.inteface';
import { AuthRegisterRequestDto, AuthRegisterResponseDto } from '@/dto';
import { AuthEntity } from '@/entities';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { mapAuthRegisterToAuthEntity } from './mappers';
import { plainToClass, plainToInstance } from 'class-transformer';

@Injectable()
export default class PostgresAuthDatabase implements IAuth {
  constructor(
    @InjectRepository(AuthEntity)
    private authRepository: Repository<AuthEntity>,
  ) {}

  async save(user: AuthRegisterRequestDto): Promise<AuthRegisterResponseDto> {
    const authEntity = mapAuthRegisterToAuthEntity(user);
    const userPrepared = this.authRepository.create(authEntity);
    try {
      const savedUser = await this.authRepository.save(userPrepared);
      return plainToInstance(AuthRegisterResponseDto, savedUser);
    } catch (error: any) {
      throw new HttpException(
        `Failed to save user to database. Error: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}


  // async saveLogin(login: SaveLoginRequestDto): Promise<SaveLoginResponseDto> {
  //   const loginPrepared = this.loginRepository.create(login);
  //   try {
  //     return (await this.loginRepository.save(
  //       loginPrepared,
  //     )) as unknown as SaveLoginResponseDto;
  //   } catch (error) {
  //     throw new HttpException(
  //       `Failed to save login to database${error}`,
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  // async findAuthByRefreshToken(refreshToken: string): Promise<AuthEntity> {
  //   try {
  //     return await this.loginRepository.findOne({
  //       where: { refreshToken: refreshToken },
  //     });
  //   } catch (error) {
  //     throw new HttpException(
  //       `Failed to find auth by refresh token${error}`,
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  // async revokeLogin(
  //   revokeLogin: RevokeLoginRequestDto,
  // ): Promise<RevokeLoginResponseDto> {
  //   try {
  //     const login = await this.loginRepository.findOne({
  //       where: { refreshToken: revokeLogin.refreshToken },
  //     });
  //     if (!login)
  //       throw new BadRequestException(
  //         `Login with refresh token ${revokeLogin.refreshToken} not found`,
  //       );
  //     login.revoked = true;
  //     const revoked = await this.loginRepository.save(login);
  //     return { ...revoked } as RevokeLoginResponseDto;
  //   } catch (error: any) {
  //     throw new BadRequestException(`Failed to revoke login: ${error.message}`);
  //   }
  // }

  // async logout(userId: string): Promise<boolean> {
  //   try {
  //     const logins = await this.loginRepository.find({
  //       where: { userId: userId },
  //     });

  //     if (!logins || logins.length === 0) {
  //       throw new Error(`No logins found for user ID ${userId}`);
  //     }

  //     for (const login of logins) {
  //       login.revoked = true;
  //       await this.loginRepository.save(login);
  //     }

  //     return true;
  //   } catch (error) {
  //     throw new HttpException(
  //       `Failed to logout user: ${error.message}`,
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

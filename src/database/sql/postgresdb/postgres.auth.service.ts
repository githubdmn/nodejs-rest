import { IAuth } from '@/database/database.inteface';
import { UserRegisterRequestDto, UserRegisterResponseDto } from '@/dto';
import {
  AdminEntity,
  AuthEntity,
  CredentialsEntity,
  UserEntity,
} from '@/entities';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  mapRegisterResultToUserResponse,
  mapUserRegisterToEntities,
} from './mappers';

@Injectable()
export default class PostgresAuthDatabase implements IAuth {
  constructor(
    @InjectRepository(AuthEntity)
    private authRepository: Repository<AuthEntity>,
    @InjectRepository(UserEntity) private userRepositoy: Repository<UserEntity>,
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
    @InjectRepository(CredentialsEntity)
    private credentialsRepository: Repository<CredentialsEntity>,
  ) {}

  async saveUser(
    user: UserRegisterRequestDto,
  ): Promise<UserRegisterResponseDto> {
    const [credentialsEntity, userEntity] = mapUserRegisterToEntities(user);
    const userPrepared = this.userRepositoy.create(userEntity);
    const credentialsPrepared =
      this.credentialsRepository.create(credentialsEntity);
    const authPrepared = this.authRepository.create({ user: userPrepared });

    try {
      return await this.authRepository.manager.transaction(
        async (transactionalEntityManager) => {
          const savedUser = await transactionalEntityManager.save(userPrepared);

          authPrepared.user = savedUser;
          const savedCredentials =
            await transactionalEntityManager.save(credentialsPrepared);
          const savedauth = await transactionalEntityManager.save(authPrepared);

          return mapRegisterResultToUserResponse(savedUser);
        },
      );
    } catch (error: any) {
      throw new HttpException(
        `DB service: Failed to save user to database. Error: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // async saveAdmin(
  //   user: AdminRegisterRequestDto,
  // ): Promise<AdminRegisterResponseDto> {
  //   throw new Error('Method not implemented.');
  //   const [authEntity, userEntity] = mapAdminRegisterToEntities(admin);
  //   const authPrepared = this.authRepository.create(authEntity);
  //   const adminPrepared = this.userRepositoy.create(adminEntity);
  //   try {
  //     return await this.authRepository.manager.transaction(
  //       async (transactionalEntityManager) => {
  //         const savedAuth = await transactionalEntityManager.save(authPrepared);
  //         const savedAdmin =
  //           await transactionalEntityManager.save(adminPrepared);
  //         return mapRegisterResultToAdminResponse(savedAuth, savedAdmin);
  //       },
  //     );
  //   } catch (error: any) {
  //     throw new HttpException(
  //       `DB service: Failed to save user to database. Error: ${error.message}`,
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }
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

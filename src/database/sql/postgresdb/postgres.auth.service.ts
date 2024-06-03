import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IAuth } from '@/database/database.inteface';
import {
  AdminRegisterRequestDto,
  AdminRegisterResponseDto,
  CredentialsDto,
  UserRegisterRequestDto,
  UserRegisterResponseDto,
} from '@/dto';
import {
  AdminEntity,
  AuthEntity,
  CredentialsEntity,
  UserEntity,
} from '@/entities';
import {
  mapAdminRegisterToEntities,
  mapRegisterResultToAdminResponse,
  mapRegisterResultToUserResponse,
  mapUserRegisterToEntities,
} from './mappers';
import { checkHashedValue } from '@/utils';

@Injectable()
export default class PostgresAuthDatabase implements IAuth {
  private readonly logger = new Logger(PostgresAuthDatabase.name);

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
          credentialsPrepared.user = savedUser;
          const savedCredentials =
            await transactionalEntityManager.save(credentialsPrepared);
          const savedAuth = await transactionalEntityManager.save(authPrepared);
          this.logger.log(
            `User successfully saved ${savedUser.email} ${savedUser.userId}`,
          );
          return mapRegisterResultToUserResponse(savedUser);
        },
      );
    } catch (error: any) {
      this.logger.error(
        `DB service: Failed to save user ${user.email} to database. Error: ${error.message}`,
      );
      throw new HttpException(
        `DB service: Failed to save user to database.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async saveAdmin(
    admin: AdminRegisterRequestDto,
  ): Promise<AdminRegisterResponseDto> {
    const [credentialsEntity, adminEntity] = mapAdminRegisterToEntities(admin);
    const adminPrepared = this.adminRepository.create(adminEntity);

    const credentialsPrepared =
      this.credentialsRepository.create(credentialsEntity);
    const authPrepared = this.authRepository.create({ admin: adminPrepared });
    try {
      return await this.adminRepository.manager.transaction(
        async (transactionalEntityManager) => {
          const savedAdmin =
            await transactionalEntityManager.save(adminPrepared);
          authPrepared.admin = savedAdmin;
          credentialsPrepared.admin = savedAdmin;
          const savedCredentials =
            await transactionalEntityManager.save(credentialsPrepared);

          authPrepared.admin = savedAdmin;
          const savedAuth = await transactionalEntityManager.save(authPrepared);
          this.logger.log(
            `User successfully saved ${savedAdmin.email} ${savedAdmin.adminId}`,
          );
          return mapRegisterResultToAdminResponse(savedAdmin);
        },
      );
    } catch (error: any) {
      this.logger.error(
        `DB service: Failed to save admin ${admin.email} to database. Error: ${error.message}`,
      );
      throw new HttpException(
        `DB service: Failed to save user to database.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async userExists(email: string): Promise<boolean> {
    const user = await this.userRepositoy.findOneBy({ email: email });
    const admin = await this.adminRepository.findOneBy({ email: email });

    return Boolean(user || admin);
  }

  async checkCredentials({
    email,
    password,
  }: CredentialsDto): Promise<boolean> {
    const user = await this.userRepositoy.findOneBy({ email: email });
    const admin = await this.adminRepository.findOneBy({ email: email });
    let credentials;

    if (user) {
      credentials = await this.credentialsRepository.findOne({
        where: {
          user: { userId: user.userId },
        },
      });
    } else if (admin) {
      credentials = await this.credentialsRepository.findOne({
        where: {
          admin: { adminId: admin.adminId },
        },
      });
    } else {
      return false;
    }    

    if (!credentials?.passwordHash) {
      return false;
    }

    const passwordCheck = await checkHashedValue(
      credentials?.passwordHash,
      password,
    );

    if (passwordCheck) {
      return true;
    } else {
      return false;
    }
  }

  async getUserIdByEmail(email: string): Promise<string> {
    const user = await this.userRepositoy.findOneBy({ email: email });
    return user ? user?.userId : '';
  }

  async getAdminIdByEmail(email: string): Promise<string> {
    const admin = await this.adminRepository.findOneBy({ email: email });
    return admin ? admin?.adminId : '';
  }

  async saveUserRefreshToken(refreshToken: string, userId: string): Promise<void> {
    const [auth] = await this.authRepository.findOneBy({ userId: userId });
    auth.refreshToken = refreshToken;
    await this.authRepository.save(auth);
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

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
// import {
//   mapAdminRegisterToEntities,
//   mapRegisterResultToAdminResponse,
//   mapRegisterResultToUserResponse,
//   mapUserRegisterToEntities,
// } from './mappers';
import { checkHashedValue, hashString } from '@/utils';
import { env } from '@/conf';
import { IUserDBAuth } from '@/database/interfaces/user-auth-db.interface';

@Injectable()
export default class UserAuthSqlite implements IUserDBAuth {
  private readonly logger = new Logger(UserAuthSqlite.name);

  constructor(
    @InjectRepository(AuthEntity)
    private authRepository: Repository<AuthEntity>,
    @InjectRepository(UserEntity) private userRepositoy: Repository<UserEntity>,
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
    @InjectRepository(CredentialsEntity)
    private credentialsRepository: Repository<CredentialsEntity>,
  ) { }

  async register(
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

  // async saveAdmin(
  //   admin: AdminRegisterRequestDto,
  // ): Promise<AdminRegisterResponseDto> {
  //   const [credentialsEntity, adminEntity] = mapAdminRegisterToEntities(admin);
  //   const adminPrepared = this.adminRepository.create(adminEntity);

  //   const credentialsPrepared =
  //     this.credentialsRepository.create(credentialsEntity);
  //   const authPrepared = this.authRepository.create({ admin: adminPrepared });
  //   try {
  //     return await this.adminRepository.manager.transaction(
  //       async (transactionalEntityManager) => {
  //         const savedAdmin =
  //           await transactionalEntityManager.save(adminPrepared);
  //         authPrepared.admin = savedAdmin;
  //         credentialsPrepared.admin = savedAdmin;
  //         const savedCredentials =
  //           await transactionalEntityManager.save(credentialsPrepared);

  //         authPrepared.admin = savedAdmin;
  //         const savedAuth = await transactionalEntityManager.save(authPrepared);
  //         this.logger.log(
  //           `User successfully saved ${savedAdmin.email} ${savedAdmin.adminId}`,
  //         );
  //         return mapRegisterResultToAdminResponse(savedAdmin);
  //       },
  //     );
  //   } catch (error: any) {
  //     this.logger.error(
  //       `DB service: Failed to save admin ${admin.email} to database. Error: ${error.message}`,
  //     );
  //     throw new HttpException(
  //       `DB service: Failed to save user to database.`,
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  // async userExists(email: string): Promise<boolean> {
  //   const user = await this.userRepositoy.findOneBy({ email: email });
  //   const admin = await this.adminRepository.findOneBy({ email: email });

  //   return Boolean(user || admin);
  // }

  // async checkCredentials({
  //   email,
  //   password,
  // }: CredentialsDto): Promise<boolean> {
  //   const admin = await this.adminRepository.findOneBy({ email: email });
  //   const user = await this.userRepositoy.findOneBy({ email: email });

  //   const findObject = admin
  //     ? { admin: { adminId: admin.adminId } }
  //     : { user: { userId: user?.userId } };

  //   const credentials = await this.credentialsRepository.findOne({
  //     where: findObject,
  //   });

  //   if (!credentials?.passwordHash) {
  //     return false;
  //   }

  //   const passwordCheck = await checkHashedValue(
  //     credentials?.passwordHash,
  //     password,
  //   );

  //   if (passwordCheck) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // async getUserIdByEmail(email: string): Promise<string> {
  //   const user = await this.userRepositoy.findOneBy({ email: email });
  //   return user ? user.userId : '';
  // }

  // async getAdminIdByEmail(email: string): Promise<string> {
  //   const admin = await this.adminRepository.findOneBy({ email });
  //   return admin ? admin.adminId : '';
  // }

  // async saveRefreshToken(
  //   isAdmin: boolean,
  //   refreshToken: string,
  //   userId: string,
  // ): Promise<any> {
  //   try {
  //     const user = isAdmin
  //       ? await this.adminRepository.findOneBy({ adminId: userId })
  //       : await this.userRepositoy.findOneBy({ userId });

  //     if (!user) {
  //       throw new Error('User not found');
  //     }
  //     console.log('user', user);

  //     const checkAuth = await this.authRepository.exists({
  //       where: {
  //         refreshToken,
  //       },
  //     });

  //     console.log('checkAuth', checkAuth);

  //     if (checkAuth) {
  //       throw new Error('User already has a refresh token');
  //     }

  //     const authPrepared = isAdmin
  //       ? await this.authRepository.create({ admin: user })
  //       : await this.authRepository.create({ user });

  //     console.log('saveRefreshToken', refreshToken, authPrepared);

  //     const milliseconds = env.refreshTokenExpiration * 1000;
  //     const date = new Date();
  //     date.setTime(date.getTime() + milliseconds);
  //     authPrepared.last_login = date;
  //     authPrepared.refreshToken = refreshToken;
  //     authPrepared.method = 'Custom';

  //     return await this.authRepository.save(authPrepared);
  //   } catch (error: any) {
  //     this.logger.error(
  //       `DB service: Failed to save refresh token. Error: ${error.message}`,
  //     );
  //     console.error(error);
  //   }
  // }

  // async deleteRefreshToken(refreshToken: string): Promise<any> {
  //   const auth = await this.authRepository.findBy({
  //     refreshToken: refreshToken,
  //   });
  //   const [authRemoved] = await this.authRepository.softRemove(auth);
  //   return authRemoved;
  // }

  // async checkRefreshToken(refreshToken: string): Promise<boolean> {
  //   const [auth] = await this.authRepository.findBy({
  //     refreshToken,
  //   });
  //   return Boolean(auth);
  // }

  // async changePassword(
  //   isAdmin: boolean,
  //   userId: string,
  //   password: string,
  //   newPassword: string,
  // ): Promise<boolean> {
  //   const findObject = isAdmin
  //     ? { admin: { adminId: userId } }
  //     : { user: { userId: userId } };

  //   const credentials = await this.credentialsRepository.findOne({
  //     where: findObject,
  //   });

  //   if (!credentials) {
  //     return false;
  //   }

  //   const passwordCheck = await checkHashedValue(
  //     credentials.passwordHash,
  //     password,
  //   );

  //   if (!passwordCheck) {
  //     return false;
  //   }

  //   credentials.passwordHash = await hashString(newPassword);

  //   const saveCredentials = await this.credentialsRepository.save(credentials);

  //   return Boolean(saveCredentials);
  // }
}

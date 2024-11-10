import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import {
  AdminEntity,
  UserEntity,
  PasswordEntity,
  RolesEntity,
  TokenEntity,
} from '../../entities';

@Injectable()
export default class AuthAdminSQLiteRepositoryService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(PasswordEntity)
    private readonly passwordRepository: Repository<PasswordEntity>,
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
    @InjectRepository(RolesEntity)
    private readonly rolesRepository: Repository<RolesEntity>,
    private logger: Logger,
  ) {}

  async findAdminByAdminId(adminId: string): Promise<AdminEntity | null> {
    return await this.adminRepository.findOne({ where: { adminId } });
  }

  async findAdminByEmail(email: string): Promise<AdminEntity | null> {
    return await this.adminRepository.findOne({ where: { email } });
  }

  async getAdminRoleId(roleId: string = '2'): Promise<RolesEntity> {
    const adminRole = await this.rolesRepository.findOne({ where: { roleId } });
    if (!adminRole) return new RolesEntity();
    return adminRole;
  }

  async createAdmin(adminData: Partial<any>): Promise<AdminEntity> {
    try {
      const checkAdmin = await this.findAdminByEmail(adminData.email);

      if (checkAdmin) {
        throw new ConflictException('Admin already exists');
      }

      return await this.adminRepository.manager.transaction(
        async (entityManager: EntityManager) => {
          const preparedAdmin = this.adminRepository.create(adminData);

          const role = await this.getAdminRoleId();
          if (!role) {
            throw new NotFoundException('Admin role not found');
          }
          preparedAdmin.role = role;

          const passwordPrepared = this.passwordRepository.create({
            password: adminData.password,
            authAdmin: preparedAdmin,
            createdAt: new Date(),
            updatedAt: new Date(),
          });

          const savedPassword = await entityManager.save(passwordPrepared);
          // const { authAdmin, ...passwordWithoutAuthAdmin } = savedPassword;
          // Object.assign(preparedAdmin, { password: passwordWithoutAuthAdmin });
          preparedAdmin.password = savedPassword;

          const savedAdmin = await entityManager.save(preparedAdmin);
          return savedAdmin;
        },
      );
    } catch (error) {
      this.logger.error('Failed to create admin:', error);

      if (
        error instanceof ConflictException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to create admin');
    }
  }

  //   // Update password for a user
  //   async updatePassword(userId: string, newPassword: string): Promise<Password> {
  //     const passwordEntity = await this.passwordRepository.findOne({
  //       where: { userId },
  //     });
  //     passwordEntity.password = newPassword;
  //     return this.passwordRepository.save(passwordEntity);
  //   }

  //   // Get roles for a user
  //   async getUserRoles(userId: string): Promise<Roles[]> {
  //     const user = await this.userRepository.findOne({
  //       where: { userId },
  //       relations: ['role'],
  //     });
  //     return user?.role ? [user.role] : [];
  //   }

  // Handle other necessary CRUD operations for AuthAdmin, Token, etc.
}

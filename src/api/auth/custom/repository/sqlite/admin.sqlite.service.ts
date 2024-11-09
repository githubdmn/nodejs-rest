import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  ) {}

  async findAdminByAdminId(adminId: string): Promise<AdminEntity | null> {
    return await this.adminRepository.findOne({ where: { adminId } });
  }

  async findAdminByEmail(email: string): Promise<AdminEntity | null> {
    return await this.adminRepository.findOne({ where: { email } });
  }

  async createAdmin(adminData: Partial<any>): Promise<AdminEntity> {
    const checkAdmin = await this.findAdminByEmail(adminData.email);
    if (checkAdmin === null) {
      return new AdminEntity();
    }
    const preparedAdmin = await this.adminRepository.create(adminData);
    return this.userRepository.save(preparedAdmin);
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

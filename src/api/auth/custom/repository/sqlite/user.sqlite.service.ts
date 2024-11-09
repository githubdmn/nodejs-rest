import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  AdminEntity,
  UserEntity,
  PasswordEntity,
  RolesEntity,
  TokenEntity,
} from './../../entities';

@Injectable()
export class AuthUserSQLiteRepositoryService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly authAdminRepository: Repository<AdminEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(PasswordEntity)
    private readonly passwordRepository: Repository<PasswordEntity>,
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
    @InjectRepository(RolesEntity)
    private readonly rolesRepository: Repository<RolesEntity>,
  ) {}

  //   // Create a new user
  //   async createUser(userData: Partial<User>): Promise<User> {
  //     const newUser = this.userRepository.create(userData);
  //     return this.userRepository.save(newUser);
  //   }

  //   // Find user by email
  //   async findUserByEmail(email: string): Promise<User | undefined> {
  //     return this.userRepository.findOne({ where: { email } });
  //   }

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

import { IUserDatabase } from '@/database/database.inteface';
import { CreateUserRequest } from '@/dto';
import { UserEntity } from '@/entities';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostgresUserService implements IUserDatabase {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async save(user: CreateUserRequest): Promise<UserEntity> {
    const userPrepared = this.userRepository.create(user);
    try {
      return await this.userRepository.save(userPrepared);
    } catch (error) {
      throw new HttpException(
        `Failed to save user to database${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findUserByUserId(userId: string): Promise<UserEntity | null> {
    try {
      return await this.userRepository.findOneBy({ userId: userId });
    } catch (error) {
      throw new HttpException(
        `Failed to save user to database${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    try {
      return await this.userRepository.findOneBy({ email: email });
    } catch (error) {
      throw new HttpException(
        `Failed to save user to database${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

import { IUserDatabase } from '@/database/database.inteface';
import {
  CreateUserRequestDto,
  CreateUserResponseDto,
  UpdateUserRequestDto,
  UpdateUserResponseDto,
} from '@/dto';
import { UserDto } from '@/dto';
import { UserEntity } from '@/entities';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostgresUserService implements IUserDatabase {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async save(user: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    const userPrepared = this.userRepository.create(user);
    try {
      return (await this.userRepository.save(
        userPrepared,
      )) as unknown as CreateUserResponseDto;
    } catch (error) {
      throw new HttpException(
        `Failed to save user to database${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findUserByUserId(userId: string): Promise<UserDto> {
    try {
      return (await this.userRepository.findOne({
        where: { userId: userId },
      })) as unknown as UserDto;
    } catch (error) {
      throw new HttpException(
        `Failed to save user to database${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findUserByEmail(email: string): Promise<UserDto> {
    try {
      return (await this.userRepository.findOne({
        where: { email: email },
      })) as unknown as UserDto;
    } catch (error) {
      throw new HttpException(
        `Failed to save user to database${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUser(
    userId: string,
    newUser: Partial<UpdateUserRequestDto>,
  ): Promise<UpdateUserResponseDto> {
    try {
      const user = await this.userRepository.findOne({
        where: { userId: userId },
      });
      if (!user)
        throw new BadRequestException(`User with ID ${userId} not found`);
      Object.assign(user, newUser);
      const updated = await this.userRepository.save(user);
      return { ...updated } as UpdateUserResponseDto;
    } catch (error: any) {
      throw new BadRequestException(`Failed to update user: ${error.message}`);
    }
  }
}

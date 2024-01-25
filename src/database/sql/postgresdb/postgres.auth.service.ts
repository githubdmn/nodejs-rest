import {
  AuthResponseDto,
  SaveLoginRequestDto,
  SaveLoginResponseDto,
} from '@/dto';
import { AuthEntity, UserEntity } from '@/entities';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { mapAuthResponse, mapSaveLoginResponse } from './mappers';

@Injectable()
export default class PostgresAuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private authRepository: Repository<AuthEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async saveLogin(login: SaveLoginRequestDto): Promise<SaveLoginResponseDto> {
    try {
      const user = await this.userRepository.findOne({
        where: { userId: login.userId },
      });
      const { userId, ...restLogin } = login;
      const auth = { ...restLogin, user: { ...user } };
      const created = this.authRepository.create(auth);
      const saved = await this.authRepository.save(created);
      return mapSaveLoginResponse(saved);
    } catch (error: any) {
      throw new HttpException(
        `Failed to save user to database${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async logout(refreshToken: string): Promise<boolean> {
    // this can delete record or preserve the record setting the revoked to false
    // due to simplicity the former is chosen
    const deleted = await this.authRepository.delete({ refreshToken });
    return deleted.affected === 1 ? true : false;
  }

  async findAuthByRefreshToken(
    refreshToken: string,
  ): Promise<Partial<AuthResponseDto>> {
    try {
      const auth = await this.authRepository.findOneOrFail({
        where: { refreshToken: refreshToken },
      });
      if (auth?.revoked) throw new Error('Expired token');
      return mapAuthResponse(auth);
    } catch (error: any) {
      throw new HttpException(
        `Failed to retrieve refresh token ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

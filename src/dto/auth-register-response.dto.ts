
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AuthRegisterResponseDto {
  @Expose()
  authId: string;

  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  refreshToken: string;

  @Expose()
  refreshTokenExpiration: Date;

  @Expose()
  last_login: Date;

  @Expose()
  method: string;
}
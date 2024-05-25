import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the authentication record',
  })
  authId: string;

  @ApiProperty({
    description: 'Unique refresh token associated with the authentication',
  })
  refreshToken: string;

  @ApiProperty({ description: 'Date when the access token will expire' })
  expiryDate: Date;

  @ApiProperty({ description: 'Date when the authentication was last used' })
  lastUsedDate: Date;

  @ApiProperty({
    description: 'Flag indicating if the authentication has been revoked',
  })
  revoked: boolean;

  @ApiProperty({
    description: 'User details associated with the authentication',
  })
  userId: string;
}

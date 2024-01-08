import { ApiProperty } from '@nestjs/swagger';

export class SaveLoginResponseDto {
  @ApiProperty({ description: 'User ID' })
  userId: string;

  @ApiProperty({ description: 'Refresh Token' })
  refreshToken: string;

  @ApiProperty({ description: 'Expiry Date of the Refresh Token' })
  expiryDate: Date;

  @ApiProperty({
    description: 'Last Used Date of the Refresh Token',
    required: false,
  })
  lastUsedDate?: Date;

  @ApiProperty({ description: 'Revoked status of the Refresh Token' })
  revoked: boolean;

  @ApiProperty({ description: 'Auth ID' })
  authId: string;
}

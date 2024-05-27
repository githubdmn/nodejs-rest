import { AuthResponseDto, UserRegisterResponseDto } from '@/dto';
import { AuthEntity, UserEntity } from '@/entities';
import { create } from 'domain';

export default function mapRegisterResultToUserResponse(
  savedAuth: AuthEntity,
  savedUser: UserEntity,
): UserRegisterResponseDto {
  return {
    authId: savedAuth.id,
    userId: savedUser.id,
    firstName: savedUser.firstName,
    lastName: savedUser.lastName,
    email: savedAuth.email,
    createdAt: new Date(),
  } as unknown as UserRegisterResponseDto;
}

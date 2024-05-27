import { AuthResponseDto, UserRegisterResponseDto } from '@/dto';
import { AuthEntity, UserEntity } from '@/entities';
import { create } from 'domain';

export default function mapRegisterResultToUserResponse(
  savedUser: UserEntity,
): UserRegisterResponseDto {
  return {
    userId: savedUser.id,
    firstName: savedUser.firstName,
    lastName: savedUser.lastName,
    email: savedUser.email,
    createdAt: savedUser.createdAt,
  } as unknown as UserRegisterResponseDto;
}

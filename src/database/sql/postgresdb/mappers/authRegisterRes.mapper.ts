import { AdminRegisterResponseDto, UserRegisterResponseDto } from '@/dto';
import { AdminEntity, UserEntity } from '@/entities';

export function mapRegisterResultToUserResponse(
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

export function mapRegisterResultToAdminResponse(
  savedAdmin: AdminEntity,
): AdminRegisterResponseDto {
  return {
    userId: savedAdmin.id,
    name: savedAdmin.name,
    email: savedAdmin.email,
    createdAt: savedAdmin.createdAt,
  } as unknown as UserRegisterResponseDto;
}

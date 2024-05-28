import { AdminRegisterResponseDto, UserRegisterResponseDto } from '@/dto';
import { AdminEntity, UserEntity } from '@/entities';

export function mapRegisterResultToUserResponse(
  savedUser: UserEntity,
): UserRegisterResponseDto {
  return {
    userId: savedUser.userId,
    firstName: savedUser.firstName,
    lastName: savedUser.lastName,
    email: savedUser.email,
    createdAt: savedUser.createdAt,
  } as UserRegisterResponseDto;
}

export function mapRegisterResultToAdminResponse(
  savedAdmin: AdminEntity,
): AdminRegisterResponseDto {
  return {
    adminId: savedAdmin.adminId,
    name: savedAdmin.name,
    email: savedAdmin.email,
    createdAt: savedAdmin.createdAt,
  } as AdminRegisterResponseDto;
}

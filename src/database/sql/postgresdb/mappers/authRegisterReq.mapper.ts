import { AdminRegisterRequestDto, UserRegisterRequestDto } from '@/dto';
import { AdminEntity, CredentialsEntity, UserEntity } from '@/entities';

export function mapUserRegisterToEntities(
  userDto: UserRegisterRequestDto,
): [CredentialsEntity, UserEntity] {
  const credentialsEntity = new CredentialsEntity();
  credentialsEntity.passwordHash = userDto.password;

  const userEntity = new UserEntity();
  userEntity.firstName = userDto.firstName;
  userEntity.lastName = userDto.lastName;
  userEntity.email = userDto.email;

  return [credentialsEntity, userEntity];
}

export function mapAdminRegisterToEntities(
  adminDto: AdminRegisterRequestDto,
): [CredentialsEntity, AdminEntity] {
  const credentialsEntity = new CredentialsEntity();
  credentialsEntity.passwordHash = adminDto.password;

  const adminEntity = new AdminEntity();
  adminEntity.name = adminDto.firstName;
  adminEntity.email = adminDto.email;

  return [credentialsEntity, adminEntity];
}

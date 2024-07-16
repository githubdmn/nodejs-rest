import { AdminRegisterRequestDto, EndUserRegisterRequestDto } from '@/dto';
import { AdminEntity, CredentialsEntity, EndUserEntity } from '@/entities';

export function mapUserRegisterToEntities(
  userDto: EndUserRegisterRequestDto,
): [CredentialsEntity, EndUserEntity] {
  const credentialsEntity = new CredentialsEntity();
  credentialsEntity.passwordHash = userDto.password;

  const userEntity = new EndUserEntity();
  userEntity.name = userDto.name;
  userEntity.email = userDto.email;

  return [credentialsEntity, userEntity];
}


import {
  AdminRegisterRequestDto,
  EndUserRegisterRequestDto,
} from '@/common/dto';
import {
  AdminEntity,
  AuthEntity,
  CredentialsEntity,
  EndUserEntity,
} from '@/common/entities';

export function mapUserRegisterToEndUserEntity(
  userDto: EndUserRegisterRequestDto,
): EndUserEntity {
  const userEntity = new EndUserEntity();
  userEntity.authorId = userDto.uid;
  userEntity.name = userDto.name;
  userEntity.email = userDto.email;


  return userEntity;
}

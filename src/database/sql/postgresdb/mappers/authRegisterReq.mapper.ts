import { UserRegisterRequestDto } from "@/dto";
import { CredentialsEntity, UserEntity } from "@/entities";

export default function mapUserRegisterToEntities(
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

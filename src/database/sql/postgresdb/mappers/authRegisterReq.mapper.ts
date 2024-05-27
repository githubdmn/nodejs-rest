import { UserRegisterRequestDto } from "@/dto";
import { AuthEntity, UserEntity } from "@/entities";

export default function mapUserRegisterToEntities(
  userDto: UserRegisterRequestDto,
): [AuthEntity, UserEntity] {
  const authEntity = new AuthEntity();
  authEntity.email = userDto.email;
  authEntity.passwordHash = userDto.password;

  const userEntity = new UserEntity();
  userEntity.firstName = userDto.firstName;
  userEntity.lastName = userDto.lastName;

  return [authEntity, userEntity];
}

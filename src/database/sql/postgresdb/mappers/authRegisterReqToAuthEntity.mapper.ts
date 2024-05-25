import { AuthRegisterRequestDto } from "@/dto";
import { AuthEntity } from "@/entities";


export default function mapAuthRegisterToAuthEntity(userDto: AuthRegisterRequestDto): AuthEntity {
    const userEntity = new AuthEntity();
    userEntity.email = userDto.email;
    userEntity.firstName = userDto.firstName;
    userEntity.lastName = userDto.lastName;
    userEntity.passwordHash = userDto.password;
    return userEntity;
  }
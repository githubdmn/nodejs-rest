import {
  EndUserRegisterResponseDto,
} from '@/dto';
import { EndUserEntity } from '@/entities';

export function mapRegisterResultToUserResponse(
  savedUser: EndUserEntity,
): EndUserRegisterResponseDto {
  const enduser: EndUserRegisterResponseDto = {
    enduserId: savedUser.enduserId,
    name: savedUser.name,
    email: savedUser.email,
    createdAt: savedUser.createdAt,
  };

  return enduser;
}

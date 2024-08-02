import {
  EndUserRegisterResponseDto,
} from '@/common/dto';
import { EndUserEntity } from '@/common/entities';

export function mapRegisterResultToUserResponse(
  savedUser: EndUserEntity,
): EndUserRegisterResponseDto {
  const enduser: EndUserRegisterResponseDto = {
    enduserId: savedUser.authorId,
    name: savedUser.name,
    email: savedUser.email,
    createdAt: savedUser.createdAt,
  };

  return enduser;
}

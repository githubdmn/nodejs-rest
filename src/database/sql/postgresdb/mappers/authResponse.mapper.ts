import { AuthResponseDto } from '@/dto';
import { AuthEntity } from '@/entities';

export default (auth: AuthEntity): Partial<AuthResponseDto> => ({
  refreshToken: auth.refreshToken,
});

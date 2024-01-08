import { SaveLoginResponseDto } from '@/dto';
import { AuthEntity } from '@/entities';

export default (auth: AuthEntity): SaveLoginResponseDto => ({
  userId: auth.user.id.toString(),
  ...auth,
});

import { SaveLoginResponseDto } from '@/dto';
import { AuthEntity } from '@/entities';

export default (auth: AuthEntity): any => ({  
  // userId: auth.user.id.toString(),
  // ...auth,
});

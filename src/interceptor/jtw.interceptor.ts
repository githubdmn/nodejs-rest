import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { verify } from 'jsonwebtoken';

@Injectable()
export class JwtInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { access_token } = request.headers;

    if (access_token) {
      try {
        request.jwtPayload = verify(access_token, 'access');
      } catch (error) {
        throw new Error('Invalid token');
      }
    }

    return next.handle();
  }
}

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';

@Injectable()
export abstract class BaseGuard implements CanActivate {
  protected abstract allowedMethods: string[];
  protected abstract allowedUrls: string[];
  protected abstract envJwtAccess: string;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { method, url } = context.getArgs()[0];
    const isMethodAllowed = this.allowedMethods.includes(method);
    const isUrlAllowed = this.allowedUrls.includes(url);
    if (isMethodAllowed && isUrlAllowed) return true;    
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error(`Invalid token -  ${authHeader}`);
    }
    const accessToken = authHeader.split(' ')[1];
    try {
      const result = verify(accessToken, this.envJwtAccess);
      request.user = result;
      return !!result;
    } catch (error: any) {
      console.error(`Error verifying access token: ${error.message}`);
      return false;
    }
  }
}

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { env } from '@/conf';

@Injectable()
export abstract class BaseGuard implements CanActivate {
  protected abstract allowedMethods: string[];
  protected abstract allowedUrls: string[];

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { method, url } = context.getArgs()[0];
    const isMethodAllowed = this.allowedMethods.includes(method);
    const isUrlAllowed = this.allowedUrls.includes(url);
    if (isMethodAllowed && isUrlAllowed) return true;
    const { access_token } = context.switchToHttp().getRequest().headers;
    if (!access_token) return false;
    try {
      const result = verify(access_token, env.jwtAccess);
      return !!result;
    } catch (error: any) {
      console.error(`Error verifying access token: ${error.message}`);
      return false;
    }
  }
}

import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { UserExistsException } from './UserExistsException';
import { InvalidCredentialsException } from './InvalidCredentialsException';

@Catch(UserExistsException, InvalidCredentialsException)
export class GeneralFilter implements ExceptionFilter {
  catch(exception: UserExistsException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    response.status(exception.getStatus()).json({
      statusCode: exception.getStatus(),
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.getResponse(),
    });
  }
}

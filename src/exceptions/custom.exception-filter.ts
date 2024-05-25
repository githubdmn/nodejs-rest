import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { YourCustomException } from './your-custom-exception';

@Catch(YourCustomException)
export class YourCustomExceptionFilter implements ExceptionFilter {
  catch(exception: YourCustomException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // Customize the response here
    response.status(exception.getStatus()).json({
      statusCode: exception.getStatus(),
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.getResponse(),
    });
  }
}

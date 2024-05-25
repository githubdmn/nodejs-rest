import { HttpException, HttpStatus } from '@nestjs/common';

export class YourCustomException extends HttpException {
  constructor() {
    super('Your custom message', HttpStatus.BAD_REQUEST);
  }
}
// @UseFilters(new YourCustomExceptionFilter())

// In NestJS, exception filters are typically used in controllers rather than services. This is because filters are designed to catch exceptions and transform them into HTTP responses, which is a responsibility of the controller layer in the MVC (Model-View-Controller) pattern.

// 	However, you can still throw custom exceptions in your services.These exceptions can then be caught by your exception filters in the controller layer.


// throw new YourCustomException();
import { HttpException, HttpStatus } from '@nestjs/common';

export class UserExistsException extends HttpException {
  constructor(private user: string) {
    super('', HttpStatus.BAD_REQUEST);
  }

  getResponse(): string | object {
    return {
      message: `${this.user} already exists`,
    };
  }
}
// @UseFilters(new YourCustomExceptionFilter())

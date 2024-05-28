import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCredentialsException extends HttpException {
  constructor(private user: string) {
    super('', HttpStatus.BAD_REQUEST);
  }

  getResponse(): string | object {
    return {
      message: `Invalid credentials provided for ${this.user}`,
    };
  }
}
// @UseFilters(new YourCustomExceptionFilter())

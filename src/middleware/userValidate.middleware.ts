import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';
import { logger } from '../config';

const validateRequestBody = (schema: z.ZodObject<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedBody = schema.parse(req.body);
      req.body = validatedBody;
      next();
    } catch (error: any) {
      logger.error(
        `Code: ${StatusCodes.BAD_REQUEST} \nInvalid request data: ${error}`,
      );
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.errors ?? 'Invalid request data',
      });
    }
  };
};
export default validateRequestBody;

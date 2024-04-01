import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { registerUser } from '../services';
// import { UserTypeDTO } from '@/dto';
// import { ApiError } from '@/utils';
// import { logger } from '@/config';
import { UserTypeDTO } from '../dto';
import { ApiError } from '../utils';
import { logger } from '../config';

export const registerUserController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userData: UserTypeDTO = req.body;
    const newUser = await registerUser(userData);
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'User registered successfully',
      data: newUser,
    });
  } catch (error: any) {
    if (error instanceof ApiError) {
      logger.error('Error registering user:', error);
      res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    } else {
      logger.error('Error registering user:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Failed to register user',
      });
    }
  }
};

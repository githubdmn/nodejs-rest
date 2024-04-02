import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { registerUser, getUserByEmail } from '../services';
// import { UserTypeDTO } from '@/dto';
// import { ApiError } from '@/utils';
// import { logger } from '@/config';
import { UserTypeDTO } from '../dto';
import { ApiError, generateAccessToken, generateRefreshToken } from '../utils';
import { logger } from '../config';
import { IUser } from '@/models/documents';

function mapSavedUserToResponse(savedUser: IUser): Partial<UserTypeDTO> {
  return {
    email: savedUser.email,
    firstName: savedUser.firstName,
    lastName: savedUser.lastName,
  };
}

export const registerUserController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userData: UserTypeDTO = req.body;
    const newUser = await registerUser(userData);
    const accessToken = generateAccessToken({
      _id: newUser._id,
      email: newUser.email,
    });
    const refreshToken = generateRefreshToken({
      _id: newUser._id,
    });

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: mapSavedUserToResponse(newUser),
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    } else {
      logger.error('Controller error registering user:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error,
      });
    }
  }
};

export const homeUserController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { email } = req.body;
    const user = await getUserByEmail(email);
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: `Welcome ${user?.firstName} ${user?.lastName}`,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    } else {
      logger.error('Controller error getting the user:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error,
      });
    }
  }
};

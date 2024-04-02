import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { logger, validatedEnv } from '../config';

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = validatedEnv;

type AccessTokenPayload = {
  _id: string;
  email: string;
};

type RefreshTokenPayload = {
  _id: string;
};

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken: string = Array.isArray(req.headers?.access)
    ? req.headers?.access[0]
    : req.headers?.access || '';
  const refreshToken: string = Array.isArray(req.headers?.refresh)
    ? req.headers?.refresh[0]
    : req.headers?.refresh || '';

  // req.headers.authorization?.split(' ')[1];
  // req.cookies.refreshToken;

  if (!accessToken || !refreshToken)
    // return next(new ApiError(StatusCodes.UNAUTHORIZED, 'Authentication required'));
    throw new Error('Authentication required');

  try {
    const accessTokenPayload = verify(
      accessToken,
      ACCESS_TOKEN_SECRET,
    ) as AccessTokenPayload;
    const refreshTokenPayload = verify(
      refreshToken,
      REFRESH_TOKEN_SECRET,
    ) as RefreshTokenPayload;

    if (refreshTokenPayload._id !== accessTokenPayload._id)
      throw new Error('Invalid refresh token');
    next();
  } catch (error) {
    logger.error('Authentication error:', error);
    // return next(new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid token'));
    return res.status(StatusCodes.UNAUTHORIZED).send(error);
  }
};

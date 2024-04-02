import { sign, SignOptions } from 'jsonwebtoken';
import { validatedEnv } from '../config';

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = validatedEnv;

type AccessTokenPayload = {
  _id: string;
  email: string;
};

type RefreshTokenPayload = {
  _id: string;
};

export const generateAccessToken = (user: AccessTokenPayload): string => {
  const accessTokenOptions: SignOptions = {
    expiresIn: '15m',
    algorithm: 'HS256',
  };
  return sign(user, ACCESS_TOKEN_SECRET, accessTokenOptions);
};

export const generateRefreshToken = (user: RefreshTokenPayload): string => {
  const refreshTokenOptions: SignOptions = {
    expiresIn: '15d',
    algorithm: 'HS256',
  };
  return sign(user, REFRESH_TOKEN_SECRET, refreshTokenOptions);
};

export default {
  generateAccessToken,
  generateRefreshToken,
};

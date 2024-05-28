import * as dotenv from 'dotenv';

dotenv.config();

const requiredEnv = [
  'DB_HOST',
  'PORT',
  'DATABASE',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_PORT',
  'POSTGRES_DB',
  'POSTGRES_SCHEMA',
  'POSTGRES_SYNC',
  'POSTGRES_LOGGING',
  'JWT_ACCESS',
  'JWT_REFRESH',
  'JWT_SECRET',
  'ACCESS_TOKEN_EXPIRATION',
  'REFRESH_TOKEN_EXPIRATION',
];

for (const envName of requiredEnv) {
  if (!process.env[envName]) {
    throw new Error(`Environment variable ${envName} is not defined`);
  }
}

export default {
  environment: process.env.NODE_ENV,
  host: process.env.DB_HOST,
  port: parseInt(process.env.PORT ?? '3000'),
  dbUse: process.env.DATABASE,
  pguser: process.env.POSTGRES_USER,
  pgpassword: process.env.POSTGRES_PASSWORD,
  pgport: process.env.POSTGRES_PORT,
  pgdb: process.env.POSTGRES_DB,
  pgType: process.env.DATABSE,
  pgSchema: process.env.POSTGRES_SCHEMA,
  pgSync: process.env.POSTGRES_SYNC,
  pgLogging: process.env.POSTGRES_LOGGING,
  jwtAccess: process.env.JWT_ACCESS || '',
  jwtRefresh: process.env.JWT_REFRESH,
  jwtSecret: process.env.JWT_SECRET,
  accessTokenExpiration: parseInt(
    process.env.ACCESS_TOKEN_EXPIRATION || '3600',
  ),
  refreshTokenExpiration: parseInt(
    process.env.REFRESH_TOKEN_EXPIRATION || '86400',
  ),
};

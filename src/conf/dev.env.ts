import * as dotenv from 'dotenv';

dotenv.config();

const requiredEnv = [
  'DATABASE_HOST',
  'PORT',
  'DATABASE_TYPE',
  'DATABASE_PORT',
  'DATABASE',
  'DATABASE_USER',
  'DATABASE_PASSWORD',
  'DATABASE_SCHEMA',
  'DATABASE_SYNC',
  'DATABASE_LOGGING',
  'JWT_ACCESS',
  'JWT_REFRESH',
  'JWT_SECRET',
  'ACCESS_TOKEN_EXPIRATION',
  'REFRESH_TOKEN_EXPIRATION',
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN',
  'FIREBASE_DATABASE_URL',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESSAGING_SENDER_ID',
  'FIREBASE_APP_ID',
  'SERVICE_ACCOUNT_TYPE',
  'SERVICE_ACCOUNT_PRIVATE_KEY_ID',
  'SERVICE_ACCOUNT_PRIVATE_KEY',
  'SERVICE_ACCOUNT_CLIENT_EMAIL',
  'SERVICE_ACCOUNT_CLIENT_ID',
  'SERVICE_ACCOUNT_AUTH_URI',
  'SERVICE_ACCOUNT_TOKEN_URI',
  'SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL',
  'SERVICE_ACCOUNT_CLIENT_X509_CERT_URL',
  'SERVICE_ACCOUNT_UNIVERSE_DOMAIN',
];

for (const envName of requiredEnv) {
  if (!process.env[envName]) {
    throw new Error(`Environment variable ${envName} is not defined`);
  }
}

export default {
  environment: process.env.NODE_ENV,
  host: process.env.NODE_ENV === 'dev' ? 'localhost' : process.env.DB_HOST,
  port: parseInt(process.env.PORT ?? '3000'),
  db: {
    type: process.env.DATABASE_TYPE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '5432'),
    database: process.env.DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    schema: process.env.DB_SCHEMA,
    synchronize: process.env.DB_SYNC,
    logging: process.env.DB_LOGGING,
  },
  jwtAccess: process.env.JWT_ACCESS || '',
  jwtRefresh: process.env.JWT_REFRESH || '',
  jwtSecret: process.env.JWT_SECRET,
  accessTokenExpiration: parseInt(
    process.env.ACCESS_TOKEN_EXPIRATION || '3600',
  ),
  refreshTokenExpiration: parseInt(
    process.env.REFRESH_TOKEN_EXPIRATION || '86400',
  ),
  firebase: {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  },
  serviceAccount: {
    type: process.env.SERVICE_ACCOUNT_TYPE,
    privateKeyId: process.env.SERVICE_ACCOUNT_PRIVATE_KEY_ID,
    privateKey: process.env.SERVICE_ACCOUNT_PRIVATE_KEY,
    clientEmail: process.env.SERVICE_ACCOUNT_CLIENT_EMAIL,
    clientId: process.env.SERVICE_ACCOUNT_CLIENT_ID,
    authUri: process.env.SERVICE_ACCOUNT_AUTH_URI,
    tokenUri: process.env.SERVICE_ACCOUNT_TOKEN_URI,
    authProviderX509CertUrl:
      process.env.SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
    clientC509CertUrl: process.env.SERVICE_ACCOUNT_CLIENT_X509_CERT_URL,
    universeDomain: process.env.SERVICE_ACCOUNT_UNIVERSE_DOMAIN,
  },
};

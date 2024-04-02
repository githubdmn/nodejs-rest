// export default {
//   NODE_ENV: process.env.NODE_ENV || 'development',
//   PORT: parseInt(process.env.PORT || '3000', 10),
//   DATABASE: process.env.DATABASE || 'mongo',
//   MONGO_PORT: parseInt(process.env.MONGO_PORT || '27017', 10),
//   MONGO_USERNAME: process.env.MONGO_USERNAME || 'admin',
//   MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'admin',
//   MONGO_DB: process.env.MONGO_DB || 'assignment',
// };

import dotenv from 'dotenv';
import path from 'path';
import { object, string, number } from 'zod';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const EnvSchema = object({
  NODE_ENV: string(),
  PORT: number(),
  DATABASE: string(),
  MONGO_PORT: number(),
  MONGO_USERNAME: string(),
  MONGO_PASSWORD: string(),
  MONGO_DB: string(),
  ACCESS_TOKEN_SECRET: string(),
  REFRESH_TOKEN_SECRET: string(),
});

const env = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: parseInt(process.env.PORT as string),
  DATABASE: process.env.DATABASE,
  MONGO_PORT: parseInt(process.env.MONGO_PORT as string),
  MONGO_USERNAME: process.env.MONGO_USERNAME,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  MONGO_DB: process.env.MONGO_DB,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
};

type ValidatedEnv = (typeof EnvSchema)['_output'];

let validatedEnv: ValidatedEnv;

try {
  validatedEnv = EnvSchema.parse(env);
} catch (error) {
  console.error('Error validating environment variables:', error);
  process.exit(1);
}

export default validatedEnv;

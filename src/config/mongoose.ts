import mongoose, { Connection } from 'mongoose';
import ValidatedEnv from './env';
import logger from './logger';

mongoose.Promise = global.Promise;

mongoose.connection.on('error', (err: Error) => {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

if (ValidatedEnv.NODE_ENV === 'development') {
  mongoose.set('debug', true);
}

// const mongooseOptions = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
// };

export const connect = async (): Promise<Connection> => {
  try {
    await mongoose.connect(
      `mongodb://localhost:${ValidatedEnv.MONGO_PORT}/${ValidatedEnv.MONGO_DB}`,
    );
    logger.info('MongoDB connected...');
    return mongoose.connection;
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error}`);
    throw error;
  }
};

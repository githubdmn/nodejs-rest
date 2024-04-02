import express from 'express';
import { logger, connect } from './config';
// import { userV1 } from '@routes';
import { userV1 } from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

connect()
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch(() => {
    logger.error('Failed to connect to MongoDB');
  });

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/v1', userV1);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;

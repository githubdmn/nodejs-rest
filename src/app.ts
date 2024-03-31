import express from 'express';
import { logger, connect } from './config';

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;

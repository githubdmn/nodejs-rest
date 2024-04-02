import express from 'express';
// import { registerUserController } from '@/controller';
import { registerUserController } from '../../controller';
import { validateRequestBody } from '../../middleware';
import { registerUserSchema } from '../../validation';

const router = express.Router();
router.use(express.json());
router
  .route('/user')
  .post(validateRequestBody(registerUserSchema), registerUserController);

export default router;

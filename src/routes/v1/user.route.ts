import express from 'express';
// import { registerUserController } from '@/controller';
import { homeUserController, registerUserController } from '../../controller';
import { validateRequestBody } from '../../middleware';
import { registerUserSchema, homeUserSchema } from '../../validation';

const router = express.Router();
router.use(express.json());
router
  .route('/user')
  .post(validateRequestBody(registerUserSchema), registerUserController);

router
  .route('/home')
  .get(validateRequestBody(homeUserSchema), homeUserController);

export default router;

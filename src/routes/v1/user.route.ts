import express from 'express';
// import { registerUserController } from '@/controller';
import { homeUserController, registerUserController } from '../../controller';
import { authenticateUser, validateRequestBody } from '../../middleware';
import { registerUserSchema, homeUserSchema } from '../../validation';

const router = express.Router();
router.use(express.json());
router
  .route('/user')
  .post(validateRequestBody(registerUserSchema), registerUserController);

router
  .route('/home')
  .post(
    authenticateUser,
    validateRequestBody(homeUserSchema),
    homeUserController,
  );

export default router;

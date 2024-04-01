import express from 'express';
// import { registerUserController } from '@/controller';
import { registerUserController } from '../../controller';

const router = express.Router();
router.use(express.json());
router.route('/user').post(registerUserController);

export default router;

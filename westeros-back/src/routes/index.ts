import { authRouter } from './auth.routes';
import { userRouter } from './user.routes';
import { Router } from 'express';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);

export { router };
import { Router } from 'express';
import { createUser } from '../controllers/user';

const userRouter = Router();

userRouter.post('/register', createUser);

export { userRouter };
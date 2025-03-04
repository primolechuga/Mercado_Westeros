import { Router } from 'express';
import { createUser, getUser } from '../controllers/user';

const userRouter = Router();

userRouter.post('/register', createUser);
userRouter.get('/:id', getUser);

export { userRouter };
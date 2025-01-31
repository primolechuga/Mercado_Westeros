import { Router } from 'express';
import { loginUser } from '../controllers/auth';

const authRouter = Router();

authRouter.post('/login', loginUser);

export { authRouter };
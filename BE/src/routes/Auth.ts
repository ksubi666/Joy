import { Router } from 'express';
import { Login, Signup } from '../controller/auth';

const authRouter = Router();

authRouter
  .post('/login', Login)
  .post('/sign-up', Signup);

export { authRouter };
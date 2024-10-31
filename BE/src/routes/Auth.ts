import { Router } from 'express';
import { Login, Signup } from '../controller/auth';

const auth = Router();

auth.post('/login', Login);
auth.post('/signup', Signup);

export { auth };

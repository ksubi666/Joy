import { Router } from 'express';
import { createUser } from 'src/controller/user';
const user = Router();

user.post('/create', createUser as any);

export default user;

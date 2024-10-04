import { Router } from 'express';
import { createUser, getUser } from 'src/controller/user';
const user = Router();

user.post('/create', createUser as any).get('/getUser/:id', getUser as any);

export { user };

import { Router } from 'express';
import { createCart, getCart } from '../controller/cart';
const cart = Router();

cart.post('/create', createCart as any).get('/getCart/:id', getCart as any);

export { cart };

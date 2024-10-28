import { Router } from 'express';
import { createCart, deleteCartItem, getCart } from '../controller/cart';
const cart = Router();

cart
  .post('/create', createCart as any)
  .get('/getCart/:id', getCart as any)
  .delete('/deleteCartItem', deleteCartItem as any);

export { cart };

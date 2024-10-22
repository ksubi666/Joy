import { Router } from 'express';
import { createProduct, getProducts } from '../controller/product';
const product = Router();

product
  .post('/create', createProduct as any)
  .get('/getProducts', getProducts as any);

export { product };

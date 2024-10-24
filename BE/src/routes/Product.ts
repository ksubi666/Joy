import { Router } from 'express';
import {
  createProduct,
  getProducts,
  updateProduct,
} from '../controller/product';
const product = Router();

product
  .post('/create', createProduct as any)
  .get('/getProducts', getProducts as any)
  .put('/productUpdate/:id', updateProduct as any);

export { product };

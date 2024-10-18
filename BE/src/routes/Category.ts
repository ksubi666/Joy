import { Router } from 'express';
import { createCategory, getCategories } from '../controller/category';
const category = Router();

category
  .post('/create', createCategory as any)
  .get('/getCategories', getCategories as any);

export { category };

import { Router } from 'express';
import { createSubCategory } from 'src/controller/subCategory';
const subCategory = Router();

subCategory.post('/create', createSubCategory as any);

export { subCategory };

import { Router } from 'express';
import { createReview, getReviews } from '../controller/review';
const review = Router();

review
  .post('/create', createReview as any)
  .get('/getReviews', getReviews as any);

export { review };

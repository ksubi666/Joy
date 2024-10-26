import { Router } from 'express';
import { createWishlist, getWishlist } from '../controller/wishlist';
const wishlist = Router();

wishlist
  .post('/create', createWishlist as any)
  .get('/getWishlist/:id', getWishlist as any);

export { wishlist };

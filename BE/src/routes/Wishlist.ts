import { Router } from 'express';
import {
  createWishlist,
  deleteWishlist,
  getWishlist,
} from '../controller/wishlist';
const wishlist = Router();

wishlist
  .post('/create', createWishlist as any)
  .get('/getWishlist/:id', getWishlist as any)
  .delete('/deleteWishlistItem', deleteWishlist as any);

export { wishlist };

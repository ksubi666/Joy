import { Request, Response } from 'express';
import { WishlistModel } from '../schema/wishlist';

export const createWishlist = async (req: Request, res: Response) => {
  const { productId, userId, _id } = req.body;

  try {
    const wishlist = await WishlistModel.findById(_id);
    if (!wishlist) {
      const response = await WishlistModel.create({
        products: { productId },
        userId,
      });
      return res.status(200).json(response);
    }

    wishlist.products.push({ productId });

    await wishlist.save();

    return res.send(wishlist);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
export const getWishlist = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await WishlistModel.findById(id)
      .populate({
        path: 'products.productId',
        model: 'product',
      })
      .populate('userId');
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getWishlists = async (res: Response) => {
  try {
    const response = await WishlistModel.find()
      .populate({
        path: 'products.productId',
        model: 'product',
      })
      .populate('userId');
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
export const deleteWishlistItem = async (req: Request, res: Response) => {
  const { productId, id } = req.body;

  try {
    const wishlist = await WishlistModel.findById(id);
    if (!wishlist) {
      return res
        .status(404)
        .json({ message: 'Wishlist not found or product not in wishlist.' });
    }

    wishlist.products.pull({ productId });

    await wishlist.save();

    return res.status(200).json(wishlist);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

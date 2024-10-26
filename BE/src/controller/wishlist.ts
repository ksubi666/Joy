import { WishlistModel } from '../schema/wishlist';
import { Request, Response } from 'express';

export const createWishlist = async (req: Request, res: Response) => {
  const { productId, userId, _id } = req.body;

  if (!productId || !userId) {
    return res
      .status(400)
      .json({ message: 'Product ID and User ID are required.' });
  }

  try {
    const wishlist = await WishlistModel.findById(_id);
    if (!wishlist) {
      const response = await WishlistModel.create({
        products: [{ ProductId: productId }],
        userId,
      });
      return res.status(201).json(response);
    }

    const productExists = wishlist.products.some(
      (item) => item.ProductId.toString() === productId
    );
    if (productExists) {
      return res.status(400).json({ message: 'Product already in wishlist.' });
    }

    wishlist.products.push({ ProductId: productId });
    await wishlist.save();

    return res.status(200).json(wishlist);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

export const getWishlist = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await WishlistModel.findById(id)
      .populate({ path: 'products.ProductId', model: 'product' })
      .populate('userId');

    if (!response) {
      return res.status(404).json({ message: 'Wishlist not found.' });
    }

    return res.status(200).json({
      message: 'Wishlist retrieved successfully.',
      wishlist: response,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

export const getWishlists = async (_: Request, res: Response) => {
  try {
    const response = await WishlistModel.find()
      .populate({ path: 'products.ProductId', model: 'product' })
      .populate('userId');

    return res.status(200).json({
      message: 'Wishlists retrieved successfully.',
      wishlists: response,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

export const deleteWishlist = async (req: Request, res: Response) => {
  const { productId, id } = req.body;

  if (!productId || !id) {
    return res
      .status(400)
      .json({ message: 'Product ID and Wishlist ID are required.' });
  }

  try {
    const wishlist = await WishlistModel.findById(id);
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found.' });
    }

    const productExists = wishlist.products.some(
      (item) => item.ProductId.toString() === productId
    );
    if (!productExists) {
      return res
        .status(404)
        .json({ message: 'Product not found in wishlist.' });
    }

    wishlist.products.pull({ ProductId: productId });
    await wishlist.save();

    return res
      .status(200)
      .json({ message: 'Product removed from wishlist.', wishlist });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

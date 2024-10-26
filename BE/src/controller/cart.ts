import { CartModel } from '../schema/cart';
import { Request, Response } from 'express';

export const createCart = async (req: Request, res: Response) => {
  const { productId, userId, _id } = req.body;

  if (!productId || !userId) {
    return res
      .status(400)
      .json({ message: 'Product ID and User ID are required.' });
  }

  try {
    const cart = await CartModel.findById(_id);
    if (!cart) {
      const response = await CartModel.create({
        products: [{ ProductId: productId }],
        userId,
      });
      return res.status(201).json(response);
    }

    const productExists = cart.products.some(
      (item) => item.ProductId.toString() === productId
    );
    if (productExists) {
      return res.status(400).json({ message: 'Product already in cart.' });
    }

    cart.products.push({ ProductId: productId });
    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
};
export const getCart = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await CartModel.findById(id)
      .populate({ path: 'products.ProductId', model: 'product' })
      .populate('userId');

    if (!response) {
      return res.status(404).json({ message: 'Cart not found.' });
    }

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
};
export const getCarts = async (_: Request, res: Response) => {
  try {
    const response = await CartModel.find()
      .populate({ path: 'products.ProductId', model: 'product' })
      .populate('userId');

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
};
export const deleteCartItem = async (req: Request, res: Response) => {
  const { productId, id } = req.body;

  if (!productId || !id) {
    return res
      .status(400)
      .json({ message: 'Product ID and Cart ID are required.' });
  }

  try {
    const cart = await CartModel.findById(id);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }

    const productExists = cart.products.some(
      (item) => item.ProductId.toString() === productId
    );
    if (!productExists) {
      return res.status(404).json({ message: 'Product not found in cart.' });
    }

    cart.products.pull({ ProductId: productId });
    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

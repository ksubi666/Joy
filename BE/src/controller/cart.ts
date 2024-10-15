import { CartModel } from '../schema/cart';
import { Request, Response } from 'express';

export const createCart = async (req: Request, res: Response) => {
  const { productId, userId, _id } = req.body;

  try {
    const cart = await CartModel.findById(_id);
    if (!cart) {
      const response = await CartModel.create({
        products: { productId },
        userId,
      });
      return res.status(200).json(response);
    }

    cart.products.push({ productId });

    await cart.save();

    return res.send(cart);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
export const getCart = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await CartModel.findById(id)
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

export const getCarts = async (res: Response) => {
  try {
    const response = await CartModel.find()
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
export const deleteCartItem = async (req: Request, res: Response) => {
  const { productId, id } = req.body;

  try {
    const cart = await CartModel.findById(id);
    if (!cart) {
      return res
        .status(404)
        .json({ message: 'Cart not found or product not in cart.' });
    }

    cart.products.pull({ productId });

    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

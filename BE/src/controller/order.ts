import { Request, Response } from 'express';
import { OrderModel } from '../schema/order';
import { CartModel } from '../schema/cart';

export const orderCreate = async (req: Request, res: Response) => {
  try {
    const { userId, products, date, time, phone, cartId } = req.body;

    const orderNum = Math.floor(100000 + Math.random() * 900000);

    const deletedCart = await CartModel.findByIdAndDelete(cartId);
    if (!deletedCart) {
      return res
        .status(404)
        .json({ success: false, message: 'Cart not found' });
    }

    const newOrder = new OrderModel({
      userId,
      orderNumber: orderNum,
      products,
      date,
      time,
      phone,
    });

    const savedOrder = await newOrder.save();

    return res.status(201).json({
      success: true,
      order: savedOrder,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error || 'Error creating order',
    });
  }
};
export const getOrders = async (_: Request, res: Response) => {
  try {
    const response = await OrderModel.find().populate('userId');
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

import { ProductModel } from '../schema/product';
import { Request, Response } from 'express';

export const createProduct = async (req: Request, res: Response) => {
  const {
    name,
    image,
    description,
    price,
    discount,
    categoryId,
    reviewId,
    location,
  } = req.body;

  try {
    const response = await ProductModel.create({
      name,
      image,
      description,
      price,
      discount,
      categoryId,
      reviewId,
      location,
    });
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getProducts = async (_: Request, res: Response) => {
  try {
    const response = await ProductModel.find().populate('categoryId');
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await ProductModel.findById(id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await ProductModel.findByIdAndDelete(id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { name, image, description, price, discount, categoryId, location } =
    req.body;

  try {
    const response = await ProductModel.findByIdAndUpdate(id, {
      name,
      image,
      description,
      price,
      discount,
      categoryId,
      location,
    });
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

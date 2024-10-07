import { categoryModel } from 'src/schema/category';
import { Request, Response } from 'express';

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const response = await categoryModel.create({ name });
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getCategories = async (res: Response) => {
  try {
    const response = await categoryModel.find();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getCategoriesAndProducts = async (res: Response) => {
  try {
    const response = await categoryModel.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: 'categoryId',
          as: 'products',
        },
      },
    ]);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const categoryUpdate = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { name } = req.body;

  try {
    const response = await categoryModel.findByIdAndUpdate(id, {
      name,
    });
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const categoryDelete = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await categoryModel.findByIdAndDelete(id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

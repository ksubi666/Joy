import { Request, Response } from 'express';
import { subCategoryModel } from 'src/schema/subCategory';

export const createSubCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const response = await subCategoryModel.create({ name });
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getSubCategories = async (res: Response) => {
  try {
    const response = await subCategoryModel.find();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getSubCategoriesAndProducts = async (res: Response) => {
  try {
    const response = await subCategoryModel.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: 'subCategoryId',
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

export const subCategoryUpdate = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { name } = req.body;

  try {
    const response = await subCategoryModel.findByIdAndUpdate(id, {
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
    const response = await subCategoryModel.findByIdAndDelete(id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

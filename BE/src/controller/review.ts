import { ReviewModel } from '../schema/review';
import { Request, Response } from 'express';

export const createReview = async (req: Request, res: Response) => {
  const { productId, userId, review, rating } = req.body;

  try {
    const response = await ReviewModel.create({
      productId,
      userId,
      review,
      rating,
    });
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getReviews = async (_: Request, res: Response) => {
  try {
    const response = await ReviewModel.find()
      .populate('userId')
      .populate('productId');
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getReview = async (req: Request, res: Response) => {
  const { productId } = req.body;
  try {
    const response = await ReviewModel.find({ productId }).populate('userId');
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await ReviewModel.findByIdAndDelete(id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
export const updateReview = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { review, rating } = req.body;

  try {
    const response = await ReviewModel.findByIdAndUpdate(id, {
      review,
      rating,
    });
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

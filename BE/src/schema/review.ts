import { Schema, model } from 'mongoose';

const reviewSchema = new Schema({
  products: [
    {
      ProductId: {
        type: Schema.ObjectId,
        ref: 'product',
        required: [true, 'Product id required'],
      },
    },
  ],
  userId: {
    type: Schema.ObjectId,
    ref: 'user',
    required: [true, 'User id required'],
  },
  review: {
    type: String
  },
  rating: {
    type: Number
  }
});

export const ReviewModel = model('review', reviewSchema);

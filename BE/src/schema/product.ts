import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  discount: {
    type: Number,
    default: 0,
  },
  categoryId: {
    type: Schema.ObjectId,
    ref: 'category',
    required: [true, 'Category id required'],
  },
  subCategoryId: {
    type: Schema.ObjectId,
    ref: 'category',
    required: [true, 'Category id required'],
  },
  reviewId: {
    type: Schema.ObjectId,
    ref: 'review',
  },
});

export const ProductModel = model('product', productSchema);

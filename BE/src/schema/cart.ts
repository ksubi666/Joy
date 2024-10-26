import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
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
});

export const CartModel = model('cart', cartSchema);

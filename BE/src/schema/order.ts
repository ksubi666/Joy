import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    ref: 'user',
    required: [true, 'User id required'],
  },
  orderNumber: {
    type: String,
  },
  products: [
    {
      type: Schema.ObjectId,
      ref: 'product',
      required: [true, 'Product id required'],
    },
  ],
  date: {
    type: Date,
  },
  time: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Order is success', 'Waiting for confirmation', 'Cancelled'],
    default: 'Order is success',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
});

export const OrderModel = model('order', orderSchema);

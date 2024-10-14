import { Schema, model } from 'mongoose';

const subCategorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'CategoryName is required'],
    unique: true,
  },
});
export const subCategoryModel = model('subCategory', subCategorySchema);

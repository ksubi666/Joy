import mongoose from 'mongoose';

export const Connect = async (uri: any) => {
  try {
    await mongoose.connect(uri);
    console.log('Successfully');
  } catch (error) {
    console.log(error);
  }
};

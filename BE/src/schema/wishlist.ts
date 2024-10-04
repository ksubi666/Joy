import { Schema, model } from "mongoose";

const wishlistSchema = new Schema({
  products: [{
    type: Schema.ObjectId,
    ref: "product",
    required: [true, "Product id required"]
  }],
  userId: {
    type: Schema.ObjectId,
    ref: "user",
    required: [true, "User id required"]
  },
});

export const WishlistModel = model("wishlist", wishlistSchema);

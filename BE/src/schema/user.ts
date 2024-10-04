import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
      type: String,
      required: [true, "Username is required"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      minlength: [12, "Please enter a valid email"],
      maxlength: [50, "Please enter a valid email"]
    },
    password: {
      type: String,
      required: [true, "Password is required"]
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"]
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  });
  
  export const UserModel = model("user", userSchema);
  


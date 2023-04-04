import mongoose from "mongoose";

let userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      maxLength: 40,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxLength: 70,
    },
    phone: {
      type: String,
      maxLength: 13,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

let User = mongoose.model("User", userSchema, "users");

export default User;

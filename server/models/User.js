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
      required: true
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
        type: String,
        default: "buyer"        //buyer, seller, admin
    }
  },
  { timestamps: true }
);

let User = mongoose.model("User", userSchema, "users");

export default User;

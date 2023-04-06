import mongoose from "mongoose";

let adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      maxLength: 70,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
        type: String,
        default: "admin",
        required : true
    },
    requests :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }]
  },
  { timestamps: true }
);

let Admin = mongoose.model("Admin", adminSchema, "admin");

export default Admin;

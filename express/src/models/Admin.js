import { model, Schema } from "mongoose";

const adminSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Admin = model("admins", adminSchema);

export default Admin;

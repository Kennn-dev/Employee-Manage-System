import { model, Schema } from "mongoose";

export const salarySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Salary = model("salaries", salarySchema);

export default Salary;

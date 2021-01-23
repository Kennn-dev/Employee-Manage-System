import { model, Schema } from "mongoose";
import { employeeSchema } from "./Employee";

const payrollSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    employees: [employeeSchema],
    realWages: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Payroll = model("payrolls", payrollSchema);

export default Payroll;

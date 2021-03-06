import { model, Schema } from "mongoose";
import { salarySchema } from "./Salary";
import { workDaySchema } from "./Workday";

export const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    remain: {
      type: Number,
      default: 10,
    },
    workDays: [workDaySchema],
    salary: salarySchema,
  },
  {
    timestamps: true,
  }
);

const Employee = model("employees", employeeSchema);

export default Employee;

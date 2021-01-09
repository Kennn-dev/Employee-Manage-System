import { model, Schema } from "mongoose";
import { employeeSchema } from "./Employee";

const leaveSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["Medical Leave", "Casual Leave"],
      default: "Casual Leave",
    },
    employee: employeeSchema,
    dateStart: {
      type: Date,
    },
    dateEnd: {
      type: Date,
    },
    reason: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Declined"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Leave = model("leaves", leaveSchema);

export default Leave;

import { model, Schema } from "mongoose";
import { employeeSchema } from "./Employee";

const shiftSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    employees: [employeeSchema],
    timeStart: {
      type: String,
    },
    timeEnd: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Shift = model("shifts", shiftSchema);

export default Shift;

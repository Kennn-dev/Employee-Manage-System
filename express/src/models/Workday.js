import { model, Schema } from "mongoose";

export const workDaySchema = new Schema(
  {
    date: String,
    timeStart: String,
    timeEnd: String,
    totalTime: Number,
  },
  {
    timestamps: true,
  }
);

const WorkDay = model("workdays", workDaySchema);

export default WorkDay;

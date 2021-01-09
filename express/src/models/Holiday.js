import { model, Schema } from "mongoose";

const holidaySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Holiday = model("holidays", holidaySchema);

export default Holiday;

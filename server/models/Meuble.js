import mongoose, { Schema } from "mongoose";

const MeubleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    materiaux: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Meuble = mongoose.model("Meuble", MeubleSchema);

export default Meuble;



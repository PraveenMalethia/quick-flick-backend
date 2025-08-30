import mongoose, { Date, Document, Schema } from "mongoose";

const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    is_active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export interface ICategory extends Document {
  name: string;
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Create the model
export const Category = mongoose.model<ICategory>("Categories", CategorySchema);

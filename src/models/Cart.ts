import mongoose, { Date, Document, Schema } from "mongoose";

const CartItemSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: false },
    quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export interface ICart extends Document {
  name: string;
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Create the model
export const CartItems = mongoose.model<ICart>("CartItem", CartItemSchema);

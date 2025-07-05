import mongoose, { Date, Document, Schema } from "mongoose";

const OrderSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product", required: false },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      }
    ],
    shipping_address: { type: Schema.Types.ObjectId, ref: "Address", required: true },
    payment_method: { type: String, required: true, enum: ["CC", "UPI", "COD"] },
    status: {
      type: String,
      required: true,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    delivery_time: { type: Date, required: false },
    tracking_number: { type: String, required: false },
    is_gift: { type: Boolean, default: false },
    gift_message: { type: String, required: false },
    total_price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export interface IOrder extends Document {
  name: string;
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Create the model
export const Orders = mongoose.model<IOrder>("Order", OrderSchema);

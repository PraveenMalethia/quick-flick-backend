import mongoose, { Date, Document, Schema } from "mongoose";

const AddressSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    address_line_1: { type: String, required: true },
    address_line_2: { type: String, required: false },
    state: { type: Number, required: true },
    city: { type: Number, required: true },
    phone: { type: String, required: true },
    is_default: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export interface IAddress extends Document {
  name: string;
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Create the model
export const Addresses = mongoose.model<IAddress>("Address", AddressSchema);

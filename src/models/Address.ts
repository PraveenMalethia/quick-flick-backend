import mongoose, { Date, Document, Schema } from "mongoose";

const AddressSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    address_line_1: { type: String, required: true },
    address_line_2: { type: String, required: false },
    state: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
    is_default: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export interface IAddress extends Document {
  name: string;
  address_line_1: string
  address_line_2: string
  state: string
  city: string
  phone: string
  is_default: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Create the model
export const Addresses = mongoose.model<IAddress>("Address", AddressSchema);

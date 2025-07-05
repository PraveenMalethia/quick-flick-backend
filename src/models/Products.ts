import mongoose, { Date, Document, Schema } from "mongoose";

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    images: [{ type: String, required: false }],
    is_active: { type: Boolean, default: true },
    weight: { type: Number, required: false },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    stock: { type: Number, required: true, default: 0 },
    brand: { type: String, required: false },
    tags: [{ type: String, required: false }],
    discount: { type: Number, required: false, default: 0 },
    discount_type: { type: String, required: false, enum: ["percentage", "fixed"], default: "percentage" },
    rating: { type: Number, required: false, default: 0 },
    reviews: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: false },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    is_featured: { type: Boolean, default: false },
    is_new: { type: Boolean, default: false },
    is_on_sale: { type: Boolean, default: false },
    sale_start_date: { type: Date, required: false },
    sale_end_date: { type: Date, required: false },
  },
  {
    timestamps: true,
  }
);

export interface IProduct extends Document {
  name: string
  description: string
  images: string
  is_active: boolean
  weight: number
  price: number
  category: string
  stock: number
  brand: string
  tags: string
  discount: number
  discount_type: string
  rating: number
  reviews: {
    user: string;
    rating: number;
    comment: string;
    createdAt: Date;
  }[];
  is_featured: boolean
  is_new: boolean
  is_on_sale: boolean
  sale_start_date: Date
  sale_end_date: Date
  createdAt: Date;
  updatedAt: Date;
}

// Create the model
export const Products = mongoose.model<IProduct>("Product", ProductSchema);

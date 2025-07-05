import mongoose, { Date, Document, Schema } from "mongoose";

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: false },
    profile_picture: { type: String, required: false },
    phone: { type: String, required: false },
    is_active: { type: Boolean, default: true },
    is_admin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export interface IUser extends Document {
  name: string;
  profile_picture: string;
  phone: string;
  is_active: boolean;
  is_admin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Create the model
export const Users = mongoose.model<IUser>("User", UserSchema);

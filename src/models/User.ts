import mongoose, { Date, Document, Schema } from "mongoose";

const UserSchema: Schema = new Schema(
  {
    firstname: { type: String, required: false },
    lastname: { type: String, required: false },
    profile_picture: { type: String, required: false },
    email: { type: String, required: false },
    country_code: { type: String, default: "+91" },
    phone: { type: String, required: true, unique: true },
    is_active: { type: Boolean, default: true },
    is_admin: { type: Boolean, default: false },
    country: { type: String, default: "India" },
    password: { type: String, required: false },
    state: { type: String, default: "Punjab" },
    city: { type: String, default: "Chandigarh" },
  },
  {
    timestamps: true,
  }
);

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  profile_picture: string;
  email: string;
  phone: string;
  country_code: string;
  country: string;
  state: string;
  city: string;
  password: string;
  is_active: boolean;
  is_admin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Create the model
export const Users = mongoose.model<IUser>("User", UserSchema);

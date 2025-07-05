import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Document } from "mongoose";

export const hashPassword = (password: string) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export const generateToken = (user: Document) => {
  const token = jwt.sign(
    { userId: user._id, role: "user" },
    <string>process.env.JWT_KEY,
    {
      expiresIn: "10d",
    }
  );
  return token;
};

export const generateAdminToken = (user: Document) => {
  const token = jwt.sign(
    { userId: user._id, role: "admin" },
    <string>process.env.JWT_KEY,
    {
      expiresIn: "10d",
    }
  );
  return token;
};

interface IDateTime {
  result: Date | boolean;
}

export const getParsedDateTime = ({
  date,
  time,
}: {
  date: string;
  time: string;
}): IDateTime => {
  const DateTime = new Date(`${date}T${time}`);

  if (isNaN(DateTime.getTime()) || isNaN(DateTime.getTime())) {
    return { result: false };
  }
  return { result: DateTime };
};

export const getParsedDate = ({
  date,
}: {
  date: string;
}): IDateTime => {
  const DateTime = new Date(date);

  if (isNaN(DateTime.getTime()) || isNaN(DateTime.getTime())) {
    return { result: false };
  }
  return { result: DateTime };
};

export const IS_DEV_ENV = process.env.NODE_ENV == "development";


export function removeOnePercentFee(grossAmount: number): number {
  return Number((grossAmount / 1.01).toFixed(6)); // 6 for USDC precision
}

import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Users } from "../models/User";
import { LOGGER } from "../utils/logger";
import { Types } from "mongoose";

export const SECRET_KEY: Secret = process.env.JWT_KEY
  ? process.env.JWT_KEY
  : "";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
  userId: Types.ObjectId;
  userRole: string;
}

export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new Error("Token not found");
    }
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = (decoded as JwtPayload).userId;
    const userRole = (decoded as JwtPayload).role;
    const user_exists = await Users.findById(userId);
    if (!user_exists) {
      res.status(403).json({
        message: "User with this token doesn't exists.",
      });
      return;
    }
    (req as CustomRequest).token = decoded;
    (req as CustomRequest).userId = new Types.ObjectId(userId);
    (req as CustomRequest).userRole = userRole;

    if (userRole === "user") {
      next();
    } else {
      res.status(403).json({
        message: "User have not permission to access this route.",
      });
    }
  } catch (error: any) {
    LOGGER.error(`Error in middleware of userAuth: ${error}`);
    res.status(401).json({
      message: "Something went wrong processing the request",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const managerAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error("Token not found");
    }

    const decoded = jwt.verify(token, SECRET_KEY);

    const userId = (decoded as JwtPayload).userId;
    const userRole = (decoded as JwtPayload).role;
    (req as CustomRequest).userId = userId;
    (req as CustomRequest).userRole = userRole;

    if (userRole === "manager" || userRole === "admin") {
      next(); // Allow access to admin routes
    } else {
      res.status(403).json({
        message: "User have not permission to access this route.",
      });
      return;
    }
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
};

export const superAdminAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error("Token not found");
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = (decoded as JwtPayload).userId;
    const admin_exists = await Users.findOne({
      _id: userId,
    });
    if (!admin_exists) {
      res.status(403).json({
        message: "Admin with this token doesn't exists.",
      });
      return;
    }

    (req as CustomRequest).userId = userId;

    if (!admin_exists.is_admin) {
      res.status(403).json({
        message: "You don't have permission to access this route.",
      });
      return;
    }
    next(); // Allow access to admin routes
  } catch (error) {
    LOGGER.error(`Error in middleware of superAdminAuth: ${error}`);
    res.status(401).json({
      message: "Something went wrong processing the request",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

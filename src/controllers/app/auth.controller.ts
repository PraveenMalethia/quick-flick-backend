import { RequestHandler } from 'express';
import { Users as User, Users } from '../../models/User';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../../middleware';
import { LOGGER } from '../../utils/logger';

export const getUserProfile: RequestHandler = async (req, res) => {
  try {
    const customReq = req as CustomRequest;
    const _id = customReq.userId;
    const user = await Users.findOne({
      _id,
    });
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }
    res.status(200).json({ user });
    return;
  } catch (error: any) {
    LOGGER.error(`Error while getting user profile: ${error}`);
    res.status(500).json({
      message: "Something went wrong while getting user profile",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { phone } = req.body;
    let user = await User.findOne({ phone });

    if (!user) {
      // Create new user without initializing vault
      user = await User.create({
        phone
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: "user",
      },
      process.env.JWT_KEY!,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      success: true,
      token,
      user,
    });

  } catch (error: any) {
    console.error('Error in wallet connection:', error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while connecting wallet",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

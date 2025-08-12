import { RequestHandler } from "express";
import { CustomRequest } from "../../middleware";
import { Users } from "../../models/User";
import { LOGGER } from "../../utils/logger";
import { Addresses } from "../../models/Address";

export const GetAddress: RequestHandler = async (req, res) => {
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
    const addresses = await Addresses.find({
      user: user._id,
    })
    res.status(200).json({ addresses });
    return;
  } catch (error: any) {
    LOGGER.error(`Error while getting user address: ${error}`);
    res.status(500).json({
      message: "Something went wrong while getting user address",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const AddAddress: RequestHandler = async (req, res) => {
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
    const address = await Addresses.create({
      user: user._id,
      name: req.body.name,
      address_line_1: req.body.address_line_1,
      address_line_2: req.body.address_line_2,
      state: req.body.state,
      city: req.body.city,
      phone: req.body.phone,
      is_default: req.body.is_default ? true : false,
    })
    res.status(200).json({ address });
    return;
  } catch (error: any) {
    LOGGER.error(`Error while getting user profile: ${error}`);
    res.status(500).json({
      message: "Something went wrong while getting user profile",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const UpdateAddress: RequestHandler = async (req, res) => {
  try {
    const customReq = req as CustomRequest;
    const _id = customReq.userId;
    const id = req.params.id
    const user = await Users.findOne({
      _id,
    });
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }
    const address = await Addresses.findByIdAndUpdate(id, {
      $set: {
        ...req.body
      },
    }, { new: true })
    res.status(200).json({ address });
    return;
  } catch (error: any) {
    LOGGER.error(`Error while getting user profile: ${error}`);
    res.status(500).json({
      message: "Something went wrong while getting user profile",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};


export const DeleteAddress: RequestHandler = async (req, res) => {
  try {
    const customReq = req as CustomRequest;
    const _id = customReq.userId;
    const id = req.params.id;
    const user = await Users.findOne({
      _id,
    });
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }
    await Addresses.findByIdAndDelete(id)
    res.status(200).json({ message: "Address deleted successfully" });
    return;
  } catch (error: any) {
    LOGGER.error(`Error while getting user address: ${error}`);
    res.status(500).json({
      message: "Something went wrong while getting user address",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

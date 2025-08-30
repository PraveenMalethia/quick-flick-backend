import { Request, Response } from 'express';
import { Category } from '../../models/Categories';
import { LOGGER } from '../../utils/logger';

export const categoryController = {
  // Create a new category
  async createCategory(req: Request, res: Response) {
    try {
      const category = await Category.create({ name: req.body.name });
      res.status(201).json(category);
    } catch (error) {
      LOGGER.error(`Error while getting user address: ${error}`);
      res.status(500).json({
        message: "Something went wrong while getting user address",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  // Get all categories
  async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      LOGGER.error(`Error while getting user address: ${error}`);
      res.status(500).json({
        message: "Something went wrong while getting user address",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
};

export default categoryController;
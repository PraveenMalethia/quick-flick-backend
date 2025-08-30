import { Router } from "express";
import { userAuth } from "../../middleware";
import categoryController from "../../controllers/app/category.controller";

const category_router = Router();

category_router.get("", userAuth, categoryController.getAllCategories);
category_router.post("", userAuth, categoryController.createCategory);

export default category_router;

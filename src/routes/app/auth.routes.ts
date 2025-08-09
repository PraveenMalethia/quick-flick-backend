import { Router } from "express";
import {
  login,
  getUserProfile,
  UpdateProfile,
} from "../../controllers/app/auth.controller";
import { userAuth } from "../../middleware";

const auth_router = Router();

auth_router.get("/profile", userAuth, getUserProfile);
auth_router.put("/profile", userAuth, UpdateProfile);
auth_router.post("/login", login);

export default auth_router;

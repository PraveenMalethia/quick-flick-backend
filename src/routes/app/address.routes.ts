import { Router } from "express";
import { userAuth } from "../../middleware";
import { AddAddress, DeleteAddress, GetAddress, UpdateAddress } from "../../controllers/app/address.controller";

const address_router = Router();

address_router.get("", userAuth, GetAddress);
address_router.post("", userAuth, AddAddress);
address_router.delete("/:id", userAuth, DeleteAddress);
address_router.put("/:id", userAuth, UpdateAddress);

export default address_router;

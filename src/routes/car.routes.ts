import { Router } from "express";
import { CarControllers } from "../controllers/car.controllers";
import { IsCarIdValid } from "../middlewares/isCarIdValid.middleware";

export const carRouter = Router();

const carControllers = new CarControllers();

carRouter.post("/", carControllers.create);
carRouter.get("/", carControllers.getMany);
carRouter.get("/:id", IsCarIdValid.execute, carControllers.getOne);
carRouter.patch("/:id", IsCarIdValid.execute, carControllers.update);
carRouter.delete("/:id", IsCarIdValid.execute, carControllers.delete);
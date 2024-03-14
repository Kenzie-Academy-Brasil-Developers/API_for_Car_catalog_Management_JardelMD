import { Router } from "express";
import { CarControllers } from "../controllers/car.controllers";
import { IsCarIdValid } from "../middlewares/isCarIdValid.middleware";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import { carCreateSchema, carUpdateSchema } from "../schemas/car.schemas";
import { VerifyToken } from "../middlewares/verifyToken.middleware";

export const carRouter = Router();

const carControllers = new CarControllers();

carRouter.post("/", VerifyToken.execute, ValidateBody.execute(carCreateSchema), carControllers.create);
carRouter.get("/", carControllers.getMany);
carRouter.use("/:id", IsCarIdValid.execute);
carRouter.get("/:id", carControllers.getOne);
carRouter.patch("/:id", VerifyToken.execute, ValidateBody.execute(carUpdateSchema), carControllers.update);
carRouter.delete("/:id", VerifyToken.execute, carControllers.delete);
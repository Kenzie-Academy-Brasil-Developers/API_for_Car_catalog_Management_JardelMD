import { Router } from "express";
import { UserControllers } from "../controllers/user.controllers";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import { userLoginBodySchema, userRegisterBodySchema } from "../schemas/user.schemas";
import { VerifyToken } from "../middlewares/verifyToken.middleware";
import { IsEmailAlreadyRegistered } from "../middlewares/isEmailAlreadyRegistered.middleware";

export const userRouter = Router();

const userControllers = new UserControllers();

userRouter.post("/", ValidateBody.execute(userRegisterBodySchema), IsEmailAlreadyRegistered.execute, userControllers.register
);

userRouter.post("/login", ValidateBody.execute(userLoginBodySchema), userControllers.login
);

userRouter.get("/", VerifyToken.execute, userControllers.getUser
);
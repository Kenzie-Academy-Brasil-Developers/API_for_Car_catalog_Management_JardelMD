import "express-async-errors";
import "dotenv/config";
import express, { json } from "express";
import helmet from "helmet";
import { carRouter } from "./routes/car.routes";
import { HandleErrors } from "./middlewares/handleErrors.middleware";
import { userRouter } from "./routes/user.routes";

export const app = express();

app.use(helmet());

app.use(json());

app.use("/users", userRouter);

app.use("/cars", carRouter);

app.use(HandleErrors.execute);
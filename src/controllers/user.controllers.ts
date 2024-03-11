import { Request, Response } from "express";
import { UserServices } from "../services/user.services";
import { TUserLoginReturn, TUserReturn } from "../schemas/user.schemas";

export class UserControllers {
   async register(req: Request, res: Response): Promise<Response<TUserReturn>> {
    const userServices = new UserServices()

      const response = await userServices.register(req.body);

      return res.status(201).json(response);
   }

   async login(req: Request, res: Response): Promise<Response<TUserLoginReturn>> {
    const userServices = new UserServices()

      const response = await userServices.login(req.body);

      return res.status(200).json(response);
   }

   async getUser(req: Request, res: Response): Promise<Response<TUserReturn>> {
    const userServices = new UserServices()

      const { id } = res.locals.decode;

      const response = await userServices.getUser(id);

      return res.status(200).json(response);
   }
}
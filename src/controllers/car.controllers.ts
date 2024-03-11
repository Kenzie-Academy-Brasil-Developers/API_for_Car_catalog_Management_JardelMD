import { Request, Response } from "express";
import { CarServices } from "../services/car.services";
import { TCar } from "../schemas/car.schemas";

export class CarControllers {
    public async create(req: Request, res: Response): Promise<Response<TCar>> {
        const carServices = new CarServices();

        const userId = res.locals.decode.id;

        const response = await carServices.create(req.body, userId);

        return res.status(201).json(response);
    };

    public async getMany(req: Request, res: Response): Promise<Response<TCar[]>> {
        const carServices = new CarServices();

        const userId = req.query.userId as string;

        const response = await carServices.getMany(userId);

        return res.status(200).json(response);
    };

    public async getOne(req: Request, res: Response): Promise<Response<TCar[]>> {
        const id = req.params.id

        const userId = req.query.userId as string;

        const carServices = new CarServices();

        const response = await carServices.getOne(id, userId);

        return res.status(200).json(response);
    };

    public async update(req: Request, res: Response): Promise<Response<TCar>> {
        const id = req.params.id;

        const userId = res.locals.decode.id;

        const carServices = new CarServices();

        const response = await carServices.update(req.body, id, userId);

        return res.status(200).json(response);
    };

    public async delete(req: Request, res: Response): Promise<Response<void>> {
        const id = req.params.id;

        const userId = res.locals.decode.id;

        const carServices = new CarServices();

        const response = await carServices.delete(id, userId);

        return res.status(204).json(response);
    };
}
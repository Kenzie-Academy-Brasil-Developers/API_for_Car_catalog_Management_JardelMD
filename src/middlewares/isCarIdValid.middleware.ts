import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appErros";

export class IsCarIdValid {
    static async execute(req: Request, res: Response, next: NextFunction) {
        const paramsId = req.params.id;

        const car = await prisma.car.findFirst({ where: { id: paramsId } });

        if (!car) {
            throw new AppError(404, "Car not found.");
        }

        next();
    }
}
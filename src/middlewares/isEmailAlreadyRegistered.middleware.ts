import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appErros";

export class IsEmailAlreadyRegistered {
    static async execute(req: Request, res: Response, next: NextFunction) {
        const user = await prisma.user.findFirst({ where: { email: req.body.email } });

        if (user) {
            throw new AppError(409, "E-mail already registered");
        };

        next();
    };
}
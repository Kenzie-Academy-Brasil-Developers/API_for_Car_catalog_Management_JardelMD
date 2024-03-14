import { prisma } from "../database/prisma";
import { TCar, TCarCreateBody, TCarUpdateBody, carSchema } from "../schemas/car.schemas";
import { AppError } from "../errors/appErros";

export class CarServices {
    public async create(body: TCarCreateBody, userId: string): Promise<TCar> {
        if (!userId) {
            throw new AppError(403, "User must be the car owner");
        }
        const newCarData = { ...body, userId };

        const newCar = await prisma.car.create({ data: newCarData });

        return carSchema.parse(newCar);
    };

    public async getMany(userId?: string): Promise<TCar[]> {
        if (!userId) {
            return await prisma.car.findMany();
        }
        const carList = await prisma.car.findMany({ where: { userId } });

        return carList;
    };

    public async getOne(id: string, userId?: string): Promise<TCar | null> {
        if (!userId ) {
            throw new AppError(403, "User must be the car owner");
        };
        const idCar = await prisma.car.findFirst({ where: { id } });
        if (idCar?.userId !== userId) {
            throw new AppError(403, "User must be the car owner");
        }
        const data = await prisma.car.findFirst({
            where: { id: id}
        });

        return data;
    };

    public async update(body: TCarUpdateBody, updatingId: string, userId: string): Promise<TCar> {
        if (!userId) {
            throw new AppError(403, "User must be the car owner");
        };

        const idCar = await prisma.car.findFirst({ where: { id: updatingId } });
        if (idCar?.userId !== userId) {
            throw new AppError(403, "User must be the car owner");
        };

        const updateCar: TCar = await prisma.car.update({
            where: { id: updatingId },
            data: { ...body, userId }
        });

        return carSchema.parse(updateCar);
    };

    public async delete(removingId: string, userId?: string): Promise<void> {
        if (!userId) {
            throw new AppError(403, "User must be the car owner");
        }

        const idCar = await prisma.car.findFirst({ where: { id: removingId } });
        if (idCar?.userId !== userId) {
            throw new AppError(403, "User must be the car owner");
        }

        await prisma.car.delete({ where: { id: removingId } });
    };
}
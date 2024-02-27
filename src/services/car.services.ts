import { prisma } from "../database/prisma";
import { TCar, TCarCreateBody, TCarUpdateBody } from "../schemas/car.schemas";


export class CarServices {
    public async create(body: TCarCreateBody): Promise<TCar> {
        const newCar = prisma.car.create({ data: body });

        return newCar;
    }

    public async getMany(): Promise<TCar[]> {
        const carList = await prisma.car.findMany();

        return carList;
    }

    public async getOne(id: string): Promise<TCar | null> {
        const data = await prisma.car.findFirst({
            where: { id: id }
        });
        return data;
    };

    public async update(body: TCarUpdateBody, updatingId: string): Promise<TCar> {
        const updateCar = await prisma.car.update({
            data: body,
            where: { id: updatingId },
        });

        return updateCar;
    }

    public async delete(removingId: string): Promise<void> {
        await prisma.car.delete({ where: { id: removingId } });
    }
}
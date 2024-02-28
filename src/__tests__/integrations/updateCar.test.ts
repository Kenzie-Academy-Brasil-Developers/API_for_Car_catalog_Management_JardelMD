import { prisma } from "../../database/prisma";
import {
    invalidCarId,
    carCreateBodyMock,
    carUpdateBodyMock,
} from "../__mocks__/car.mocks";
import { request } from "../utils/request";

describe("Integration test: update car", () => {
    beforeEach(async () => {
        await prisma.$transaction([prisma.car.deleteMany()]);
    });

    test("should be able to update a car succesfully", async () => {
        const car = await prisma.car.create({ data: carCreateBodyMock });

        const data = await request
            .patch(`/cars/${car.id}`)
            .send(carUpdateBodyMock)
            .expect(200)
            .then((response) => response.body);

        const updateCar = { ...car, ...carUpdateBodyMock };

        expect(data).toStrictEqual(updateCar);
    });

    test("should throw error when car is invalid", async () => {
        await request.patch(`/cars/${invalidCarId}`).expect(404);
    });
});
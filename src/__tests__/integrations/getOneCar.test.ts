import { prisma } from "../../database/prisma";
import {  carCreateBodyListMock, carListMock, carMock, invalidCarId } from "../__mocks__/car.mocks";
import { request } from "../utils/request";
import { carDefaultExpects } from "../utils/carDefaultExpects";

describe("Integration test: get one car", () => {
    beforeEach(async () => {
        await prisma.$transaction([prisma.car.deleteMany()]);
    });

    test("should be able to get one car successfully", async () => {
        const car = await prisma.car.create({ data: carCreateBodyListMock[0] });

        const data = await request
            .get(`/cars/${car.id}`)
            .expect(200)
            .then((response) => response.body);

        // expect(data).toHaveLength(1);

        carDefaultExpects(data, carListMock[0]);
        // carDefaultExpects(data[1], carCreateBodyListMock[1]);
    });

    test("should be able to get one car successfully", async () => {
        const car = await prisma.car.create({ data: carCreateBodyListMock[1] });

        const data = await request
            .get(`/cars/${car.id}`)
            .expect(200)
            .then((response) => response.body);

      

        carDefaultExpects(data, carListMock[1]);
       
    });

    test("should throw error when car is invalid", async () => {
        await request.delete(`/cars/${invalidCarId}`).expect(404);
    });
});
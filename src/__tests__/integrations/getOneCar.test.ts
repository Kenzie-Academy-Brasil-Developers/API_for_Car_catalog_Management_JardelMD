import { prisma } from "../../database/prisma";
import { carCreateBodyListMock, carCreateBodyMock, carListMock, carMock, invalidCarId, userId } from "../__mocks__/car.mocks";
import { request } from "../utils/request";
import { carDefaultExpects } from "../utils/carDefaultExpects";
import { loginUserMock } from "../__mocks__/user.mocks";
import { completeCarMockInt } from "../__mocks__/integrations/integrations.mocks";

describe("Integration test: get one car", () => {
    const baseUrl = "/cars";
    beforeEach(async () => {
        await prisma.$transaction([prisma.user.deleteMany()]);
    });
    beforeEach(async () => {
        await prisma.$transaction([prisma.car.deleteMany()]);
    });

    test("should be able to get one car successfully", async () => {
        const { user } = await loginUserMock();

        const newCar = { ...carCreateBodyListMock[0], userId: user.id };

        const car = await prisma.car.create({ data: newCar });

        const data = await request
            .get(`/cars`)
            .expect(200)
            .then((response) => response.body);

        expect(data[0]).toStrictEqual(car);
    });

     test("should throw error when user is not to be the car owner", async () => {
            const { user } = await loginUserMock();

            const newCar = { ...carCreateBodyListMock[0], userId: user.id };

            const car = await prisma.car.create({ data: newCar });

            const data = await request
                .get(`/cars/${car.id}`)
                .expect(403)
                .then((response) => response.body);

            expect(data.message).toStrictEqual("User must be the car owner");
        });

    test("should throw error when car is invalid", async () => {
        await request.get(`/cars/${invalidCarId}`).expect(404);
    });
});
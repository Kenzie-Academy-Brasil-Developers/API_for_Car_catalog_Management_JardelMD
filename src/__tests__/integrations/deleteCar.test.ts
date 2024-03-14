import { prisma } from "../../database/prisma";
import { invalidCarId, carCreateBodyMock } from "../__mocks__/car.mocks";
import { loginUserMock } from "../__mocks__/user.mocks";
import { request } from "../utils/request";

describe("Integration test: delete car", () => {
    beforeEach(async () => {
        await prisma.$transaction([prisma.user.deleteMany()]);
    });
    test("should be able to delete a car successfully", async () => {
        const { user, token } = await loginUserMock();

        const car = await prisma.car.create({ data: { ...carCreateBodyMock, userId: user.id } });

        await request
            .delete(`/cars/${car.id}`)
            .set("Authorization", token)
            .expect(204);
    });

    test("should throw error when car is invalid", async () => {
        const { token } = await loginUserMock();

        await request
            .delete(`/cars/${invalidCarId}`)
            .set("Authorization", token)
            .expect(404);
    });
});
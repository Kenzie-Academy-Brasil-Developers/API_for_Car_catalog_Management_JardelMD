import { prisma } from "../../database/prisma";
import { carCreateBodyListMock, carCreateBodyMock } from "../__mocks__/car.mocks";
import { request } from "../utils/request";
import { carDefaultExpects } from "../utils/carDefaultExpects";
import { loginUserMock } from "../__mocks__/user.mocks";

describe("Integration test: get many cars", () => {
    beforeEach(async () => {
        await prisma.$transaction([prisma.user.deleteMany()]);
    });
    beforeEach(async () => {
        await prisma.$transaction([prisma.car.deleteMany()]);
    });

    test("should be able to get many cars successfully", async () => {
        const {token} = await loginUserMock()
        await prisma.car.create({ data: carCreateBodyMock });

        const data = await request
            .get("/cars")
            .set("Authorization", token)
            .expect(200)
            .then((response) => response.body);

        expect(data).toHaveLength(1);
        carDefaultExpects(data[0], carCreateBodyListMock[0]);
    });
});
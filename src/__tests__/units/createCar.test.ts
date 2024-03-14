import { CarServices } from "../../services/car.services";
import { carCreateBodyMock, carMock, userId } from "../__mocks__/car.mocks";
import { prismaMock } from "../__mocks__/prisma";

describe("Unit test: create car", () => {
    test("create car should work correctly", async () => {
        const carServices = new CarServices();

        prismaMock.car.create.mockResolvedValue(carMock);
        const data = await carServices.create(carCreateBodyMock, userId);

        expect(data).toStrictEqual(carMock);
    });
});
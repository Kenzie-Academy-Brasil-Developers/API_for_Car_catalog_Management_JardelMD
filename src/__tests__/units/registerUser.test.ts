import { UserServices } from "../../services/user.services";
import { prismaMock } from "../__mocks__/prisma";
import { completeUserMock, userMock, userRegisterBodyMock } from "../__mocks__/user.mocks";


describe("Unit test: register user", () => {
    test("register user should work correctly", async () => {
        const userServices = new UserServices();

        prismaMock.user.create.mockResolvedValue(await completeUserMock());
        const data = await userServices.register(userRegisterBodyMock);

        expect(data).toStrictEqual(userMock);
    });

    test("register user should throw error when email is already registered", async () => {
        const userServices = new UserServices();

        prismaMock.user.findFirst.mockResolvedValue(await completeUserMock());
        const register = async () => await userServices.register(userRegisterBodyMock);

        expect(register()).rejects.toThrow("E-mail already registered");
    });
});
import { container } from "tsyringe"
import { UserServices } from "../../services/user.services"
import { prismaMock } from "../__mocks__/prisma";
import { completeUserMock, userLoginBodyMock, userLoginBodyWrongPasswordMock, userMock } from "../__mocks__/user.mocks";

describe("Unit test: login user", () => {
    test("login user should work correctly", async () => {
        const userServices = new UserServices();

        const completeUser = await completeUserMock();

        prismaMock.user.findFirst.mockResolvedValue(completeUser);
        const data = await userServices.login(userLoginBodyMock);

        expect(data.token).toBeDefined();
        expect(data.user).toStrictEqual(userMock);
    });

    test("login user should throw error when user does not exist", async () => {
        const userServices = new UserServices();

        const login = async () => await userServices.login(userLoginBodyMock);

        expect(login()).rejects.toThrow("User not registered");
    });

    test("login user should throw error when password is wrong", async () => {
        const userServices = new UserServices();

        const completeUser = await completeUserMock();

        prismaMock.user.findFirst.mockResolvedValue(completeUser);
        const login =  async () => await userServices.login(userLoginBodyWrongPasswordMock);

        expect(login()).rejects.toThrow("E-mail and password doesn't match");
    });
})
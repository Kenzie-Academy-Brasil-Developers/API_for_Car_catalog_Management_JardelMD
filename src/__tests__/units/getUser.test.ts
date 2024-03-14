import { UserServices } from "../../services/user.services"
import { prismaMock } from "../__mocks__/prisma";
import { completeUserMock, userMock } from "../__mocks__/user.mocks";

describe("Unit test: getUser", () => {
    test("get user should work correctly", async () => {
        const userServices = new UserServices();

        const completeUser = await completeUserMock();

        prismaMock.user.findFirst.mockResolvedValue(completeUser);
        const data = await userServices.getUser(completeUser.id);

        expect(data).toStrictEqual(userMock);
    })
})
import { prisma } from "../../database/prisma";
import { loginUserMock } from "../__mocks__/user.mocks";
import { request } from "../utils/request";

describe("Integration test: get user", () => {
    beforeEach(async () => {
        await prisma.$transaction([prisma.user.deleteMany()])
    })
    test("should be able to get user successfully", async () => {
        const { user, token } = await loginUserMock();

        const data = await request
            .get("/users")
            .set("Authorization", token)
            .then((response) => response.body);

        const body = {...data, password:user.password}; //Criei um corpo com todas as chaves de user para ser comparado no expect

        expect(body).toStrictEqual(user); //Pq o data não tem password, por isso criei o body, passando a senha criptografada de user como chave para o password
    });
});
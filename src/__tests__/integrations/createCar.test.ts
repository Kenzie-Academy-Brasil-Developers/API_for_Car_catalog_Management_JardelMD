import { prisma } from "../../database/prisma";
import { carCreateBodyMock } from "../__mocks__/car.mocks";
import { invalidCarCreateBodyMock } from "../__mocks__/integrations/ensureValidCreateBody.mock";
import { completeCarMockInt } from "../__mocks__/integrations/integrations.mocks";
import { loginUserMock } from "../__mocks__/user.mocks";
import { carDefaultExpects } from "../utils/carDefaultExpects";
import { request } from "../utils/request";

describe("Integration test: create car", () => {
   const baseUrl = "/cars";
   beforeEach(async () => {
      await prisma.$transaction([prisma.user.deleteMany()]);
   });
   beforeEach(async () => {
      await prisma.$transaction([prisma.car.deleteMany()]);
   });

   test("should be able to create a car successfully", async () => {
      const { token } = await loginUserMock();

      const data = await request
         .post(`${baseUrl}`)
         .send(completeCarMockInt)
         .set("Authorization", token)
         .expect(201)
         .then((response) => response.body);

      const expectedCar = {
         id: data.id,
         name: data.name,
         description: data.description,
         brand: data.brand,
         year: data.year,
         km: data.km,
         userId: data.userId
      };

      expect(token).toBeDefined();
      carDefaultExpects(data, expectedCar)
   });

   test("Should not be able to create a car - invalid body", async () => {
      const { token } = await loginUserMock();
      const response = await request.post(baseUrl).send({}).set("Authorization", token);

      const expectedValue = {
         issues: [
            {
               code: "invalid_type",
               expected: "string",
               message: "Required",
               path: ["name"],
               received: "undefined",
            },
            {
               code: "invalid_type",
               expected: "string",
               message: "Required",
               path: ["description"],
               received: "undefined",
            },
            {
               code: "invalid_type",
               expected: "string",
               message: "Required",
               path: ["brand"],
               received: "undefined",
            },
            {
               code: "invalid_type",
               expected: "number",
               message: "Required",
               path: ["year"],
               received: "undefined",
            }, {
               code: "invalid_type",
               expected: "number",
               message: "Required",
               path: ["km"],
               received: "undefined",
            },
         ],
         name: "ZodError"
      };

      expect(response.body).toStrictEqual(expectedValue);
      expect(response.status).toBe(400);
   });

   test("Should not be able to create a car - invalid body - invalid keys", async () => {
      const { token } = await loginUserMock();
      const car = await prisma.car.create({ data: carCreateBodyMock });
      const response = await request.patch(`${baseUrl}/${car.id}`).send(invalidCarCreateBodyMock).set("Authorization", token);

      const expectedValue = {
         issues: [
            {
               code: "invalid_type",
               expected: "string",
               message: "Expected string, received number",
               path: ["name"],
               received: "number",
            },
            {
               code: "invalid_type",
               expected: "string",
               message: "Expected string, received number",
               path: ["description"],
               received: "number",
            },
            {
               code: "invalid_type",
               expected: "string",
               message: "Expected string, received number",
               path: ["brand"],
               received: "number",
            },
            {
               code: "invalid_type",
               expected: "number",
               message: "Expected number, received string",
               path: ["year"],
               received: "string",
            }, {
               code: "invalid_type",
               expected: "number",
               message: "Expected number, received boolean",
               path: ["km"],
               received: "boolean",
            },
         ],
         name: "ZodError"
      };

      expect(response.body).toStrictEqual(expectedValue);
      expect(response.status).toBe(400);
   });
});
import { CarServices } from "../../services/car.services";
import { carMock, userId } from "../__mocks__/car.mocks";


describe("Unit test: delete car", () => {
   test("delete car should work correctly", async () => {
      const carServices = new CarServices();

      const deleteCar = async () => await carServices.delete(carMock.id, userId);

      expect(deleteCar()).rejects.toThrow("User must be the car owner");
   });
});
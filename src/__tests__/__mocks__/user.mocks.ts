import { prisma } from "../../database/prisma";
import jwt from "jsonwebtoken";
import { hashPassword } from "../utils/hashPassword";

export const userMock = {
   id: "855ae363-9e01-483e-a6d4-1a20d64fa762",
   name: "John Doe",
   email: "johndoe3@gmail.com",
};

export const completeUserMock = async () => {
   const password = await hashPassword("12345678");

   return {
      id: "855ae363-9e01-483e-a6d4-1a20d64fa762",
      name: "John Doe",
      email: "johndoe3@gmail.com",
      password,
   };
};

export const createUserBodyMock = async () => {
   const password = await hashPassword("12345678");

   return {
      name: "John Doe",
      email: "johndoe8@gmail.com",
      password,
   };
};

export const userRegisterBodyMock = {
   name: "John Doe",
   email: "johndoe6@gmail.com",
   password: "12345678",
};

export const invalidUserRegisterBodyMock = {
   name: 123,
   email: 123,
   password: 123,
};

export const userLoginBodyMock = {
   email: "johndoe8@gmail.com",
   password: "12345678",
};

export const userLoginBodyWrongPasswordMock = {
   email: "johndoe8@gmail.com",
   password: "12345687",
};

export const invalidUserLoginBodyMock = {
   email: 123,
   password: 123,
};

export const loginUserMock = async () => {
   const data = await createUserBodyMock();

   const user = await prisma.user.create({ data });

   const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);

   return { user, token };
};

export const invalidTokenMock = async () => {
   const token = jwt.sign({}, "INVALID_SECRET");

   return token;
};
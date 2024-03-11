import { prisma } from "../database/prisma";
import { AppError } from "../errors/appErros";
import {
   TUserLoginBody,
   TUserLoginReturn,
   TUserRegisterBody,
   TUserReturn,
   userReturnSchema,
} from "../schemas/user.schemas";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserServices {
   async register(body: TUserRegisterBody): Promise<TUserReturn> {
      const existingUser = await prisma.user.findFirst({ where: { email: body.email } });

      if (existingUser) {
         throw new AppError(403, "E-mail already registered");
      }

      const hashPassword = await bcrypt.hash(body.password, 10);

      const userData: TUserRegisterBody = {
         ...body,
         password: hashPassword,
      };

      const newUser = await prisma.user.create({ data: userData });

      return userReturnSchema.parse(newUser);
   }

   async login(body: TUserLoginBody): Promise<TUserLoginReturn> {
      const user = await prisma.user.findFirst({ where: { email: body.email } });

      if (!user) {
         throw new AppError(404, "User not registered");
      }

      const comparePassword = await bcrypt.compare(body.password, user.password);

      if (!comparePassword) {
         throw new AppError(403, "E-mail and password doesn't match");
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);

      return {
         token,
         user: userReturnSchema.parse(user),
      };
   }

   async getUser(userId: string): Promise<TUserReturn> {
      const user = await prisma.user.findFirst({ where: { id: userId } });

      return userReturnSchema.parse(user);
   }
}
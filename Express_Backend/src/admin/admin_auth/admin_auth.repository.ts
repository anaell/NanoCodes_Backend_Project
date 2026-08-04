import { prisma } from "../../lib/prisma.js";
import type {
  createAdminUser_InputType,
  getAdminUser_InputType,
  getAdminUserById_InputType,
} from "./admin_auth.types.js";

export class AdminAuthRepository {
  async getAdminUser({ email, password }: getAdminUser_InputType) {
    try {
      const admin_user = await prisma.admin_User.findUniqueOrThrow({
        where: { email, password },
        select: { name: true, email: true, admin_id: true },
      });

      return admin_user;
    } catch (error) {
      // const error_message =
      //   error instanceof Error ? error.message : "An unknown error occurred";
      throw error;
    }
  }

  async createAdminUser({ email, name, password }: createAdminUser_InputType) {
    try {
      const create_admin_user = await prisma.admin_User.create({
        data: {
          email,
          name,
          password,
        },
        select: { email: true, name: true, admin_id: true },
      });

      return create_admin_user;
    } catch (error) {
      // const error_message =
      //   error instanceof Error ? error.message : "An unknown error occurred";
      // console.error(error);

      throw error;
    }
  }

  async getAdminUserById({ admin_id }: getAdminUserById_InputType) {
    try {
      const admin_user = await prisma.admin_User.findUniqueOrThrow({
        where: { admin_id },
        select: { admin_id: true, email: true, name: true },
      });

      return admin_user;
    } catch (error) {
      throw error;
    }
  }
}

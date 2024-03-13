import { PrismaClient } from "@prisma/client";
import testPrisma from "lib/testPrisma";

interface IUserRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  country?: string;
  state?: string;
  city?: string;
  address?: string;
  roleId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class UpdateUserService {
  async execute(
    {
      id,
      name,
      email,
      password,
      country,
      state,
      city,
      address,
      roleId,
    }: IUserRequest,
    client: PrismaClient = testPrisma,
  ) {
    const userExists = await client.user.findUnique({
      where: {
        id,
      },
    });
    if (!userExists) {
      throw new Error("User not found.");
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Invalid email address format.");
      }

      const existingUser = await client.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new Error("Email address is already in use.");
      }
    }

    if (password) {
      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long.");
      }
    }

    if (roleId) {
      const role = await client.role.findUnique({ where: { id: roleId } });
      if (!role) {
        throw new Error("Role not found.");
      }
    }

    const updatedUser = await client.user.update({
      where: { id },
      data: {
        name,
        email,
        password,
        country,
        state,
        city,
        address,
        roleId,
      },
      include: {
        role: {
          select: {
            id: true,
            roleName: true,
          },
        },
      },
    });

    return updatedUser;
  }
}

export { UpdateUserService };

import { PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  country?: string;
  state?: string;
  city?: string;
  address?: string;
  roleId: string;
}

class CreateUserService {
  async execute(
    { name, email, password, roleId, ...props }: IUserRequest,
    client: PrismaClient = prisma,
  ) {
    if (!name || !email || !password || !roleId) {
      throw new Error("Name, email, password, and roleId are required.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email address format.");
    }

    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters long.");
    }

    const role = await client.role.findUnique({ where: { id: roleId } });
    if (!role) {
      throw new Error("Role not found.");
    }

    const existingUser = await client.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error("Email address is already in use.");
    }

    const createdUser = await client.user.create({
      data: {
        name,
        email,
        password,
        roleId,
        ...props,
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

    return createdUser;
  }
}

export { CreateUserService };

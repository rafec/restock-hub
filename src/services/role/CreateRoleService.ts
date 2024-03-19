import { PrismaClient } from "@prisma/client";
import testPrisma from "lib/testPrisma";

interface IRoleRequest {
  roleName: string;
}

class CreateRoleService {
  async execute({ roleName }: IRoleRequest, client: PrismaClient = testPrisma) {
    if (!roleName) {
      throw new Error("Invalid role name.");
    }

    const roleAlreadyExists = await client.role.findUnique({
      where: {
        roleName,
      },
    });
    if (roleAlreadyExists) {
      throw new Error("Role already exists.");
    }

    if (roleName.length < 2 || roleName.length > 25) {
      throw new Error("Role name must be between 2 and 25 characters long.");
    }

    const createdRole = await client.role.create({
      data: {
        roleName,
      },
    });

    return createdRole;
  }
}

export { CreateRoleService };

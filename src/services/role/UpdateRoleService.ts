import { PrismaClient } from "@prisma/client";
import testPrisma from "lib/testPrisma";

interface IRoleRequest {
  id: string;
  roleName?: string;
}

class UpdateRoleService {
  async execute(
    { id, roleName }: IRoleRequest,
    client: PrismaClient = testPrisma,
  ) {
    const roleExists = await client.role.findUnique({
      where: {
        id,
      },
    });
    if (!roleExists) {
      throw new Error("Role not found.");
    }

    if (roleName) {
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
    }

    const updatedRole = await client.role.update({
      where: {
        id,
      },
      data: {
        roleName,
      },
    });

    return updatedRole;
  }
}

export { UpdateRoleService };

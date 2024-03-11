import { PrismaClient } from "@prisma/client";
import testPrisma from "lib/testPrisma";

class DeleteRoleService {
  async execute(id: string, client: PrismaClient = testPrisma) {
    const roleExists = await client.role.findUnique({
      where: {
        id,
      },
    });
    if (!roleExists) {
      throw new Error("Role not found.");
    }

    const deletedRole = await client.role.delete({
      where: {
        id,
      },
    });

    const roleAfterDeletion = await client.role.findUnique({
      where: {
        id,
      },
    });

    if (roleAfterDeletion) {
      throw new Error("Failed to delete role.");
    }

    return deletedRole;
  }
}

export { DeleteRoleService };

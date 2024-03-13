import { PrismaClient } from "@prisma/client";
import testPrisma from "lib/testPrisma";

class FindRoleService {
  async execute(id: string, client: PrismaClient = testPrisma) {
    const role = await client.role.findUnique({
      where: {
        id,
      },
    });

    if (!role) {
      throw new Error("Role not found.");
    }

    return role;
  }
}

export { FindRoleService };

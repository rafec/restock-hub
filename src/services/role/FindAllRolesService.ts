import { PrismaClient } from "@prisma/client";
import testPrisma from "lib/testPrisma";

class FindAllRolesService {
  async execute(client: PrismaClient = testPrisma) {
    const allRoles = await client.role.findMany();

    if (allRoles.length === 0) return "There is no roles registered yet.";

    return allRoles;
  }
}

export { FindAllRolesService };

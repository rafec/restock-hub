import { PrismaClient } from "@prisma/client";
import testPrisma from "src/lib/testPrisma";

class FindAllUsersService {
  async execute(client: PrismaClient = testPrisma) {
    const allUsers = await client.user.findMany({
      include: {
        role: {
          select: {
            id: true,
            roleName: true,
          },
        },
      },
    });

    if (allUsers.length === 0) return "There is no users registered yet.";

    return allUsers;
  }
}

export { FindAllUsersService };

import { PrismaClient } from "@prisma/client";
import testPrisma from "lib/testPrisma";

class FindUserService {
  async execute(id: string, client: PrismaClient = testPrisma) {
    const user = await client.user.findUnique({
      where: { id },
      include: {
        role: {
          select: {
            id: true,
            roleName: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    return user;
  }
}

export { FindUserService };

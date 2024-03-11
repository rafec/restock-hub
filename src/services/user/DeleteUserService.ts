import { PrismaClient } from "@prisma/client";
import testPrisma from "lib/testPrisma";

class DeleteUserService {
  async execute(id: string, client: PrismaClient = testPrisma) {
    const userExists = await client.user.findUnique({
      where: {
        id,
      },
    });
    if (!userExists) {
      throw new Error("User not found.");
    }

    const deletedUser = await client.user.delete({
      where: {
        id,
      },
    });

    const userAfterDeletion = await client.user.findUnique({
      where: {
        id,
      },
    });

    if (userAfterDeletion) {
      throw new Error("Failed to delete user.");
    }

    return deletedUser;
  }
}

export { DeleteUserService };

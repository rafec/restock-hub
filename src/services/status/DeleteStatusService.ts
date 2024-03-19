import { PrismaClient } from "@prisma/client";
import testPrisma from "lib/testPrisma";

class DeleteStatusService {
  async execute(id: string, client: PrismaClient = testPrisma) {
    const statusExists = await client.status.findUnique({
      where: {
        id,
      },
    });
    if (!statusExists) {
      throw new Error("Status not found.");
    }

    const deletedStatus = await client.status.delete({
      where: {
        id,
      },
    });

    const statusAfterDeletion = await client.status.findUnique({
      where: {
        id,
      },
    });

    if (statusAfterDeletion) {
      throw new Error("Failed to delete status.");
    }

    return deletedStatus;
  }
}

export { DeleteStatusService };

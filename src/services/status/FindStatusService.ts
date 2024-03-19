import { PrismaClient } from "@prisma/client";
import testPrisma from "lib/testPrisma";

class FindStatusService {
  async execute(id: string, client: PrismaClient = testPrisma) {
    const status = await client.status.findUnique({
      where: {
        id,
      },
    });

    if (!status) {
      throw new Error("Status not found.");
    }

    return status;
  }
}

export { FindStatusService };

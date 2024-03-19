import { PrismaClient } from "@prisma/client";
import testPrisma from "lib/testPrisma";

interface IStatusRequest {
  id: string;
  name?: string;
}

class UpdateStatusService {
  async execute(
    { id, name }: IStatusRequest,
    client: PrismaClient = testPrisma,
  ) {
    const statusExists = await client.status.findUnique({
      where: {
        id,
      },
    });
    if (!statusExists) {
      throw new Error("Status not found.");
    }

    if (name) {
      const statusAlreadyExists = await client.status.findUnique({
        where: {
          name,
        },
      });
      if (statusAlreadyExists) {
        throw new Error("Status already exists.");
      }

      if (name.length < 2 || name.length > 25) {
        throw new Error(
          "Status name must be between 2 and 25 characters long.",
        );
      }
    }

    const updatedStatus = await client.status.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return updatedStatus;
  }
}

export { UpdateStatusService };

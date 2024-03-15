import { PrismaClient } from "@prisma/client";
import testPrisma from "lib/testPrisma";

interface IStatusRequest {
  name: string;
}

class CreateStatusService {
  async execute({ name }: IStatusRequest, client: PrismaClient = testPrisma) {
    if (!name) {
      throw new Error("Invalid status name.");
    }

    const statusAlreadyExists = await client.status.findUnique({
      where: {
        name,
      },
    });
    if (statusAlreadyExists) {
      throw new Error("Status already exists.");
    }

    const createdStatus = await client.status.create({ data: { name } });

    return createdStatus;
  }
}

export { CreateStatusService };

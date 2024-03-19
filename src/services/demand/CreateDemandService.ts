import { PrismaClient } from "@prisma/client";
import testPrisma from "src/lib/testPrisma";

interface IDemandRequest {
  userId: string;
  description: string;
  keywords: string[];
  statusId: string;
}

class CreateDemandService {
  async execute(
    { userId, description, keywords, statusId }: IDemandRequest,
    client: PrismaClient = testPrisma,
  ) {
    if (!userId || !description || !keywords || !statusId) {
      throw new Error(
        "User ID, description, keywords, and status ID are required.",
      );
    }

    const userExists = await client.user.findUnique({ where: { id: userId } });
    if (!userExists) {
      throw new Error("User not found.");
    }

    if (description.length < 5 || description.length > 255) {
      throw new Error("Description must be between 5 and 255 characters long.");
    }

    if (!Array.isArray(keywords) || keywords.length === 0) {
      throw new Error("Keywords must be provided as a non-empty array.");
    }
    for (const keyword of keywords) {
      if (keyword.length < 2 || keyword.length > 20) {
        throw new Error("Keyword length must be between 2 and 20 characters.");
      }
    }

    const statusExists = await client.status.findUnique({
      where: { id: statusId },
    });
    if (!statusExists) {
      throw new Error("Status not found.");
    }

    const createdDemand = await client.demand.create({
      data: {
        userId,
        description,
        keywords: { set: keywords },
        statusId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return createdDemand;
  }
}

export { CreateDemandService };

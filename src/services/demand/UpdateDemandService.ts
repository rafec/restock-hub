import { PrismaClient } from "@prisma/client";
import testPrisma from "lib/testPrisma";

interface IDemandRequest {
  id: string;
  userId?: string;
  description?: string;
  keywords?: string[];
  statusId?: string;
}

class UpdateDemandService {
  async execute(
    { id, userId, description, keywords, statusId }: IDemandRequest,
    client: PrismaClient = testPrisma,
  ) {
    const existingDemand = await client.demand.findUnique({ where: { id } });
    if (!existingDemand) {
      throw new Error("Demand not found.");
    }

    if (userId) {
      const userExists = await client.user.findUnique({
        where: { id: userId },
      });
      if (!userExists) {
        throw new Error("User not found.");
      }
    }

    if (description && (description.length < 5 || description.length > 255)) {
      throw new Error("Description must be between 5 and 255 characters long.");
    }

    if (keywords) {
      if (!Array.isArray(keywords) || keywords.length === 0) {
        throw new Error("Keywords must be provided as a non-empty array.");
      }
      for (const keyword of keywords) {
        if (keyword.length < 2 || keyword.length > 20) {
          throw new Error(
            "Keyword length must be between 2 and 20 characters.",
          );
        }
      }
    }

    if (statusId) {
      const statusExists = await client.status.findUnique({
        where: { id: statusId },
      });
      if (!statusExists) {
        throw new Error("Status not found.");
      }
    }

    const updatedDemand = await client.demand.update({
      where: { id },
      data: {
        userId,
        description,
        keywords: keywords ? { set: keywords } : undefined,
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

    return updatedDemand;
  }
}

export { UpdateDemandService };

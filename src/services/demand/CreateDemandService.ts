import { PrismaClient } from "@prisma/client";
import testPrisma from "src/lib/testPrisma";

interface IDemandRequest {
  userId: string;
  description: string;
  keywords: string[];
  status: string;
}

class CreateDemandService {
  async execute(
    { userId, description, keywords, status }: IDemandRequest,
    client: PrismaClient = testPrisma,
  ) {
    if (!userId || !description || !keywords || !status) {
      throw new Error(
        "User ID, description, keywords, and status are required.",
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

    const validStatusValues = ["pending", "approved", "rejected"];
    if (!validStatusValues.includes(status)) {
      throw new Error("Invalid status value.");
    }

    const createdDemand = await client.demand.create({
      data: {
        userId,
        description,
        keywords: { set: keywords },
        status,
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

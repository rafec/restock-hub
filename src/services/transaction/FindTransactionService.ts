import { PrismaClient } from "@prisma/client";
import testPrisma from "lib/testPrisma";

class FindTransactionService {
  async execute(id: string, client: PrismaClient = testPrisma) {
    const transaction = await client.transaction.findUnique({
      where: { id },
      include: {
        buyer: {
          select: {
            id: true,
            name: true,
          },
        },
        supplier: {
          select: {
            id: true,
            name: true,
          },
        },
        product: {
          select: {
            id: true,
            productName: true,
          },
        },
      },
    });

    if (!transaction) {
      throw new Error("Transaction not found.");
    }

    return transaction;
  }
}

export { FindTransactionService };

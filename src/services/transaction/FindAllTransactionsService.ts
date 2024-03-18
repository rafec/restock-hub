import { PrismaClient } from "@prisma/client";
import testPrisma from "lib/testPrisma";

class FindAllTransactionsService {
  async execute(client: PrismaClient = testPrisma) {
    const allTransactions = await client.transaction.findMany({
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

    if (allTransactions.length === 0)
      return "There is no transactions registered yet.";

    return allTransactions;
  }
}

export { FindAllTransactionsService };

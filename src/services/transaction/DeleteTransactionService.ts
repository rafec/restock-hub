import { PrismaClient } from "@prisma/client";
import testPrisma from "lib/testPrisma";

class DeleteTransactionService {
  async execute(id: string, client: PrismaClient = testPrisma) {
    const transactionExists = await client.transaction.findUnique({
      where: { id },
    });
    if (!transactionExists) {
      throw new Error("Transaction not found.");
    }

    const deletedTransaction = await client.transaction.delete({
      where: { id },
    });

    const transactionAfterDeletion = await client.transaction.findUnique({
      where: {
        id,
      },
    });

    if (transactionAfterDeletion) {
      throw new Error("Failed to delete transaction.");
    }

    return deletedTransaction;
  }
}

export { DeleteTransactionService };

import prisma from "lib/prisma";

class DeleteTransactionService {
  async execute(id: string) {
    const transactionExists = await prisma.transaction.findUnique({
      where: { id },
    });
    if (!transactionExists) {
      throw new Error("Transaction not found.");
    }

    if (!id) {
      throw new Error("The ID informed is invalid.");
    }

    const deletedTransaction = await prisma.transaction.delete({
      where: { id },
    });

    const transactionAfterDeletion = await prisma.transaction.findUnique({
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

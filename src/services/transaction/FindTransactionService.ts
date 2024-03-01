import prisma from "lib/prisma";

class FindTransactionService {
  async execute(id: string) {
    const transaction = await prisma.transaction.findUnique({ where: { id } });

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    return transaction;
  }
}

export { FindTransactionService };

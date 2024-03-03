import prisma from "lib/prisma";

class FindTransactionService {
  async execute(id: string) {
    const transaction = await prisma.transaction.findUnique({
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
      },
    });

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    return transaction;
  }
}

export { FindTransactionService };

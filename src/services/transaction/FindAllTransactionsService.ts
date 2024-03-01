import prisma from "lib/prisma";

class FindAllTransactionsService {
  async execute() {
    const allTransactions = await prisma.transaction.findMany();

    if (allTransactions.length === 0)
      return "There is no transactions registered yet.";

    return allTransactions;
  }
}

export { FindAllTransactionsService };

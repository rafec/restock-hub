import prisma from "lib/prisma";

class FindAllStocksService {
  async execute() {
    const allStocks = await prisma.stock.findMany();

    if (allStocks.length === 0) return "There is no stocks registered yet.";

    return allStocks;
  }
}

export { FindAllStocksService };

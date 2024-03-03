import prisma from "lib/prisma";

class FindAllStocksService {
  async execute() {
    const allStocks = await prisma.stock.findMany({
      include: {
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

    if (allStocks.length === 0) return "There is no stocks registered yet.";

    return allStocks;
  }
}

export { FindAllStocksService };

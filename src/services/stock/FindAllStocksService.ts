import { PrismaClient } from "@prisma/client";
import testPrisma from "lib/testPrisma";

class FindAllStocksService {
  async execute(client: PrismaClient = testPrisma) {
    const allStocks = await client.stock.findMany({
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

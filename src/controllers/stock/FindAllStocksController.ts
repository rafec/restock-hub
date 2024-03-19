import { Request, Response } from "express";
import { FindAllStocksService } from "services/stock/FindAllStocksService";
import prisma from "lib/prisma";

class FindAllStocksController {
  async handle(request: Request, response: Response) {
    try {
      const findAllStocksService = new FindAllStocksService();
      const allStocks = await findAllStocksService.execute(prisma);

      return response
        .status(200)
        .json({ message: "Succesfull operation.", data: allStocks });
    } catch (error) {
      console.log("Error retrieving stocks records.", error);
      response.status(400).json({ message: error.message, data: [] });
    }
  }
}
export { FindAllStocksController };

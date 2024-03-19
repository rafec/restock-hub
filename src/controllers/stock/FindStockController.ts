import { Request, Response } from "express";
import { FindStockService } from "services/stock/FindStockService";
import prisma from "lib/prisma";

class FindStockController {
  async handle(request: Request, response: Response) {
    try {
      const { supplierId, productId } = request.params;
      const findStockService = new FindStockService();

      const stock = await findStockService.execute(
        { supplierId, productId },
        prisma,
      );

      return response
        .status(200)
        .json({ message: "Succesfull operation.", data: stock });
    } catch (error) {
      console.log("Error finding stock.", error);
      response.status(404).json({ message: error.message, data: {} });
    }
  }
}

export { FindStockController };

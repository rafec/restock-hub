import { Request, Response } from "express";
import { FindAllStocksService } from "src/services/stock/FindAllStocksService";

class FindAllStocksController {
  async handle(request: Request, response: Response) {
    try {
      const findAllStocksService = new FindAllStocksService();
      const allStocks = await findAllStocksService.execute();

      return response
        .status(200)
        .json({ message: "Succesfull operation.", data: allStocks });
    } catch (error) {
      console.log("Error retrieving stocks records.", error);
      response.status(404).json({ message: error.message, data: [] });
    }
  }
}
export { FindAllStocksController };

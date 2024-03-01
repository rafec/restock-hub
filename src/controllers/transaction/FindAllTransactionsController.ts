import { Request, Response } from "express";
import { FindAllTransactionsService } from "services/transaction/FindAllTransactionsService";

class FindAllTransactionsController {
  async handle(request: Request, response: Response) {
    try {
      const findAllTransactionsService = new FindAllTransactionsService();
      const allTransactions = await findAllTransactionsService.execute();

      return response
        .status(200)
        .json({ message: "Succesfull operation.", data: allTransactions });
    } catch (error) {
      console.log("Error retrieving transactions records.", error);
      response.status(404).json({ message: error.message, data: [] });
    }
  }
}

export { FindAllTransactionsController };

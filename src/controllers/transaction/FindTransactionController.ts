import { Request, Response } from "express";
import { FindTransactionService } from "services/transaction/FindTransactionService";

class FindTransactionController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    try {
      const findTrasactionService = new FindTransactionService();
      const transaction = await findTrasactionService.execute(id);

      return response
        .status(200)
        .json({ message: "Succesfull operation.", data: transaction });
    } catch (error) {
      console.log(`Error retreving transaction with id ${id}`, error);
      response.status(404).json({ message: error.message, data: {} });
    }
  }
}

export { FindTransactionController };

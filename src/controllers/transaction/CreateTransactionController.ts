import { Request, Response } from "express";
import { CreateTransactionService } from "services/transaction/CreateTransactionService";

class CreateTransactionController {
  async handle(request: Request, response: Response) {
    try {
      const { buyerId, supplierId, productId, quantity, totalValue } =
        request.body;
      const createTransactionService = new CreateTransactionService();

      const createdTransaction = await createTransactionService.execute({
        buyerId,
        supplierId,
        productId,
        quantity,
        totalValue,
      });

      return response.status(200).json({
        message: "Succesfull operation. Transaction created.",
        data: createdTransaction,
      });
    } catch (error) {
      console.log("Error creating transaction.", error);
      response.status(404).json({ message: error.message, data: {} });
    }
  }
}

export { CreateTransactionController };

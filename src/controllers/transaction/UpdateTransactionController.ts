import { Request, Response } from "express";
import { UpdateTransactionService } from "services/transaction/UpdateTransactionService";

class UpdateTransactionController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    try {
      const { buyerId, supplierId, productId, quantity, totalValue } =
        request.body;
      const updateTransactionService = new UpdateTransactionService();

      const updatedTransaction = await updateTransactionService.execute({
        id,
        buyerId,
        supplierId,
        productId,
        quantity,
        totalValue,
      });

      return response.status(200).json({
        message: "Succesfull operation. Transaction updated.",
        data: updatedTransaction,
      });
    } catch (error) {
      console.log(`Error updating transaction with id ${id}.`);
      response.status(404).json({ message: error.message, data: {} });
    }
  }
}

export { UpdateTransactionController };

import { Request, Response } from "express";
import { DeleteTransactionService } from "services/transaction/DeleteTransactionService";
import prisma from "lib/prisma";

class DeleteTransactionController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    try {
      const deleteTransactionService = new DeleteTransactionService();

      const deletedTransaction = await deleteTransactionService.execute(
        id,
        prisma,
      );

      return response
        .status(204)
        .json({ message: "Succesfull operation", data: deletedTransaction });
    } catch (error) {
      console.log(`Error deleting transaction with id ${id}`, error);
      response.status(404).json({ message: error.message, data: {} });
    }
  }
}

export { DeleteTransactionController };

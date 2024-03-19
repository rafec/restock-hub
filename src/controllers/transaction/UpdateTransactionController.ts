import { Request, Response } from "express";
import { UpdateTransactionService } from "services/transaction/UpdateTransactionService";
import prisma from "lib/prisma";

interface ITransactionRequest {
  buyerId: string;
  supplierId?: string;
  productId?: string;
  quantity?: number;
  totalValue?: number;
}

class UpdateTransactionController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    try {
      const transactionProps: ITransactionRequest = request.body;
      const updateTransactionService = new UpdateTransactionService();

      const updatedTransaction = await updateTransactionService.execute(
        {
          id,
          ...transactionProps,
        },
        prisma,
      );

      return response.status(200).json({
        message: "Succesfull operation. Transaction updated.",
        data: updatedTransaction,
      });
    } catch (error) {
      console.log(`Error updating transaction with id ${id}.`);
      response.status(400).json({ message: error.message, data: {} });
    }
  }
}

export { UpdateTransactionController };

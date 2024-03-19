import { Request, Response } from "express";
import { CreateTransactionService } from "services/transaction/CreateTransactionService";
import prisma from "lib/prisma";

interface ITransactionRequest {
  buyerId: string;
  supplierId: string;
  productId: string;
  quantity: number;
  totalValue: number;
}

class CreateTransactionController {
  async handle(request: Request, response: Response) {
    try {
      const transactionProps: ITransactionRequest = request.body;
      const createTransactionService = new CreateTransactionService();

      const createdTransaction = await createTransactionService.execute(
        {
          ...transactionProps,
        },
        prisma,
      );

      return response.status(200).json({
        message: "Succesfull operation. Transaction created.",
        data: createdTransaction,
      });
    } catch (error) {
      console.log("Error creating transaction.", error);
      response.status(400).json({ message: error.message, data: {} });
    }
  }
}

export { CreateTransactionController };

import { Request, Response } from "express";
import { CreateStockService } from "services/stock/CreateStockService";

interface IStockRequest {
  supplierId: string;
  productId: string;
  quantity: number;
}

class CreateStockController {
  async handle(request: Request, response: Response) {
    try {
      const stockProps: IStockRequest = request.body;
      const createStockService = new CreateStockService();

      const createdStock = await createStockService.execute({
        ...stockProps,
      });

      return response.status(200).json({
        message: "Succesfull operation. Stock created.",
        data: createdStock,
      });
    } catch (error) {
      console.log("Error creating stock.", error);
      response.status(404).json({ message: error.message, data: {} });
    }
  }
}

export { CreateStockController };

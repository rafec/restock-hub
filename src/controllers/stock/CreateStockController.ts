import { Request, Response } from "express";
import { CreateStockService } from "services/stock/CreateStockService";

class CreateStockController {
  async handle(request: Request, response: Response) {
    try {
      const { supplierId, productId, quantity } = request.body;
      const createStockService = new CreateStockService();

      const createdStock = await createStockService.execute({
        supplierId,
        productId,
        quantity,
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

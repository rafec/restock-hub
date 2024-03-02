import { Request, Response } from "express";
import { UpdateStockService } from "services/stock/UpdateStockService";

interface IStockRequest {
  quantity?: number;
}

class UpdateStockController {
  async handle(request: Request, response: Response) {
    try {
      const { supplierId, productId } = request.params;
      const stockProps: IStockRequest = request.body;
      const updateStockService = new UpdateStockService();

      const updatedStock = await updateStockService.execute({
        supplierId,
        productId,
        ...stockProps,
      });

      return response.status(200).json({
        message: "Succesfull operation. Stock updated.",
        data: updatedStock,
      });
    } catch (error) {
      console.log("Error updating stock.", error);
      response.status(404).json({ message: error.message, data: {} });
    }
  }
}

export { UpdateStockController };

import { Request, Response } from "express";
import { DeleteStockService } from "src/services/stock/DeleteStockService";

class DeleteStockController {
  async handle(request: Request, response: Response) {
    try {
      const { supplierId, productId } = request.params;
      const deleteStockService = new DeleteStockService();

      const deletedStock = await deleteStockService.execute({
        supplierId,
        productId,
      });

      return response.status(204).json({
        message: "Succesfull operation. Stock deleted.",
        data: deletedStock,
      });
    } catch (error) {
      console.log("Error deleting stock.", error);
      response.status(404).json({ message: error.message, data: {} });
    }
  }
}

export { DeleteStockController };

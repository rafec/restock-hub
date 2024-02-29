import { Request, Response } from "express";
import { DeleteDemandService } from "services/demand/DeleteDemandService";

class DeleteDemandController {
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const deleteDemandService = new DeleteDemandService();

      const deletedDemand = await deleteDemandService.execute(id);

      return response.status(204).json({
        message: "Succesfull operation. Demand deleted.",
        data: deletedDemand,
      });
    } catch (error) {
      console.log("Error deleting demand.", error);
      response.status(404).json({ message: error.message, data: {} });
    }
  }
}

export { DeleteDemandController };

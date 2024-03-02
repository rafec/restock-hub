import { Request, Response } from "express";
import { UpdateDemandService } from "services/demand/UpdateDemandService";

interface IDemandRequest {
  id: string;
  userId?: string;
  description?: string;
  keywords?: string[];
  status?: string;
}

class UpdateDemandController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    try {
      const props: IDemandRequest = request.body;
      const updateDemandService = new UpdateDemandService();

      const updatedDemand = await updateDemandService.execute({
        id,
        ...props,
      });

      return response.status(200).json({
        message: "Succesfull operation. Demand updated.",
        data: updatedDemand,
      });
    } catch (error) {
      console.log(`Error updating demand with id ${id}.`);
      response.status(404).json({ message: error.message, data: {} });
    }
  }
}

export { UpdateDemandController };

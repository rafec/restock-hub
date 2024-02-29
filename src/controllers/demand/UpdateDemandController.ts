import { Request, Response } from "express";
import { UpdateDemandService } from "services/demand/UpdateDemandService";

class UpdateDemandController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    try {
      const { userId, description, keywords, status } = request.body;
      const updateDemandService = new UpdateDemandService();

      console.log(keywords);

      const updatedDemand = await updateDemandService.execute({
        id,
        userId,
        description,
        keywords,
        status,
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

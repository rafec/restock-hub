import { Request, Response } from "express";
import { CreateDemandService } from "services/demand/CreateDemandService";

class CreateDemandController {
  async handle(request: Request, response: Response) {
    try {
      const { userId, description, keywords, status } = request.body;
      const createDemandService = new CreateDemandService();

      const createdDemand = await createDemandService.execute({
        userId,
        description,
        keywords,
        status,
      });

      return response.status(200).json({
        message: "Succesfull operation. Demand created.",
        data: createdDemand,
      });
    } catch (error) {
      console.log("Error creating demand.", error);
      response.status(404).json({ message: error.message, data: {} });
    }
  }
}

export { CreateDemandController };

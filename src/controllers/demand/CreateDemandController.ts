import { Request, Response } from "express";
import { CreateDemandService } from "services/demand/CreateDemandService";

interface IDemandRequest {
  userId: string;
  description: string;
  keywords: string[];
  status: string;
}

class CreateDemandController {
  async handle(request: Request, response: Response) {
    try {
      const props: IDemandRequest = request.body;
      const createDemandService = new CreateDemandService();

      const createdDemand = await createDemandService.execute({
        ...props,
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

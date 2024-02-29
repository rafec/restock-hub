import { Request, Response } from "express";
import { FindDemandService } from "services/demand/FindDemandService";

class FindDemandController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    try {
      const findDemandService = new FindDemandService();

      const demand = await findDemandService.execute(id);
      return response
        .status(200)
        .json({ message: "Succesfull operation.", data: demand });
    } catch (error) {
      console.log(`Error retrieving demand with id ${id}`, error);
      response.status(404).json({ message: error.message, data: {} });
    }
  }
}

export { FindDemandController };

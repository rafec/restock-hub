import { Request, Response } from "express";
import { FindAllDemandsService } from "services/demand/FindAllDemandsService";

class FindAllDemandsController {
  async handle(request: Request, response: Response) {
    try {
      const findAllDemandsService = new FindAllDemandsService();

      const allDemands = await findAllDemandsService.execute();

      return response
        .status(200)
        .json({ message: "Succesfull operation.", data: allDemands });
    } catch (error) {
      console.log("Error retrieving demands records.", error);
      response.status(404).json({ message: error.message, data: [] });
    }
  }
}

export { FindAllDemandsController };

import { Request, Response } from "express";
import { FindAllRolesService } from "src/services/role/FindAllRolesService";

class FindAllRolesController {
  async handle(request: Request, response: Response) {
    try {
      const findAllRolesService = new FindAllRolesService();
      const allRoles = await findAllRolesService.execute();

      return response
        .status(200)
        .json({ message: "Succesfull operation.", data: allRoles });
    } catch (error) {
      console.log("Error retrieving roles records.", error);
      response.status(404).json({ message: error.message, data: [] });
    }
  }
}

export { FindAllRolesController };

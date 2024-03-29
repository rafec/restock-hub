import { Request, Response } from "express";
import { FindAllRolesService } from "services/role/FindAllRolesService";
import prisma from "lib/prisma";

class FindAllRolesController {
  async handle(request: Request, response: Response) {
    try {
      const findAllRolesService = new FindAllRolesService();
      const allRoles = await findAllRolesService.execute(prisma);

      return response
        .status(200)
        .json({ message: "Succesfull operation.", data: allRoles });
    } catch (error) {
      console.log("Error retrieving roles records.", error);
      response.status(400).json({ message: error.message, data: [] });
    }
  }
}

export { FindAllRolesController };

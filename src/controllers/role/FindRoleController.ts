import { Request, Response } from "express";
import prisma from "src/lib/prisma";
import { FindRoleService } from "src/services/role/FindRoleService";

class FindRoleController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    try {
      const findRoleService = new FindRoleService();
      const role = await findRoleService.execute(id);

      return response
        .status(200)
        .json({ message: "Succesfull operation.", data: role });
    } catch (error) {
      console.log();
      return response.status(404).json({ message: error.message, data: {} });
    }
  }
}

export { FindRoleController };

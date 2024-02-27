import { Request, Response } from "express";
import { FindRoleService } from "services/role/FindRoleService";

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
      console.log(`Error retrieving role with id ${id}`, error);
      return response.status(404).json({ message: error.message, data: {} });
    }
  }
}

export { FindRoleController };

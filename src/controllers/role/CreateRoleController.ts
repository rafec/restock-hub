import { Request, Response } from "express";
import { CreateRoleService } from "services/role/CreateRoleService";

class CreateRoleController {
  async handle(request: Request, response: Response) {
    try {
      const { roleName } = request.body;
      const createRoleService = new CreateRoleService();

      const createdRole = await createRoleService.execute(roleName);

      return response.status(201).json({
        message: "Succesfull operation. Role created.",
        data: createdRole,
      });
    } catch (error) {
      console.log("Error creating role: ", error.message);
      response.status(400).json({ message: error.message, data: [] });
    }
  }
}

export { CreateRoleController };

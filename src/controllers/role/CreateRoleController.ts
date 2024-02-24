import { Request, Response } from "express";
import { CreateRoleService } from "src/services/role/CreateRoleService";

class CreateRoleController {
  async handle(request: Request, response: Response) {
    const { roleName } = request.body;
    const createRoleService = new CreateRoleService();

    const role = await createRoleService.execute(roleName);

    return response.json(role);
  }
}

export { CreateRoleController };

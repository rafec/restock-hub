import { Request, Response } from "express";
import { CreateRoleService } from "services/role/CreateRoleService";
import prisma from "lib/prisma";

interface IRoleRequest {
  roleName: string;
}

class CreateRoleController {
  async handle(request: Request, response: Response) {
    try {
      const roleProps: IRoleRequest = request.body;
      const createRoleService = new CreateRoleService();

      const createdRole = await createRoleService.execute(
        {
          ...roleProps,
        },
        prisma,
      );

      return response.status(201).json({
        message: "Succesfull operation. Role created.",
        data: createdRole,
      });
    } catch (error) {
      console.log("Error creating role: ", error.message);
      response.status(400).json({ message: error.message, data: {} });
    }
  }
}

export { CreateRoleController };

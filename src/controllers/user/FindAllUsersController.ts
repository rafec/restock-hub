import { Request, Response } from "express";
import { FindAllUsersService } from "services/user/FindAllUsersService";
import prisma from "lib/prisma";

class FindAllUsersController {
  async handle(request: Request, response: Response) {
    try {
      const findAllUsersService = new FindAllUsersService();
      const allUsers = await findAllUsersService.execute(prisma);

      return response
        .status(200)
        .json({ message: "Succesfull operation.", data: allUsers });
    } catch (error) {
      console.log("Error retrieving users records", error);
      response.status(400).json({ message: error.message, data: [] });
    }
  }
}

export { FindAllUsersController };

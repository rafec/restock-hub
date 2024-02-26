import { Request, Response } from "express";
import { FindAllUsersService } from "services/user/FindAllUsersService";

class FindAllUsersController {
  async handle(request: Request, response: Response) {
    try {
      const findAllUsersService = new FindAllUsersService();
      const allUsers = await findAllUsersService.execute();

      return response
        .status(200)
        .json({ message: "Succesfull operation.", data: allUsers });
    } catch (error) {
      console.log("Error retrieving users records", error);
      response.status(404).json({ message: error.message, data: [] });
    }
  }
}

export { FindAllUsersController };

import { Request, Response } from "express";
import { FindUserService } from "services/user/FindUserService";

class FindUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    try {
      const findUserService = new FindUserService();
      const user = await findUserService.execute(id);

      return response
        .status(200)
        .json({ message: "Succesfull operation.", data: user });
    } catch (error) {
      console.log(`Error retrieving user with id ${id}`, error);
      response.status(404).json({ message: error.message, data: {} });
    }
  }
}

export { FindUserController };

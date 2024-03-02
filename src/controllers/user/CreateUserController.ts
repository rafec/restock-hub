import { Request, Response } from "express";
import { CreateUserService } from "services/user/CreateUserService";

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  country?: string;
  state?: string;
  city?: string;
  address?: string;
  roleId: string;
}

class CreateUserController {
  async handle(request: Request, response: Response) {
    try {
      const userProps: IUserRequest = request.body;
      const createUserService = new CreateUserService();

      const createdUser = await createUserService.execute({
        ...userProps,
      });

      return response.status(201).json({
        message: "Succesfull operation. User created.",
        data: createdUser,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
      response.status(404).json({ message: error.message, data: {} });
    }
  }
}

export { CreateUserController };

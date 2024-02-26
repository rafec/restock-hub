import express from "express";
import {
  CreateUserController,
  DeleteUserController,
  FindAllUsersController,
} from "src/controllers/user";

const routes = express.Router();

const createUserController = new CreateUserController();
const deleteUserController = new DeleteUserController();
const findAllUsersController = new FindAllUsersController();

routes.get("/", findAllUsersController.handle);
routes.post("/", createUserController.handle);
routes.delete("/:id", deleteUserController.handle);

export default routes;

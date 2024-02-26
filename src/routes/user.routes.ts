import express from "express";
import { CreateUserController } from "src/controllers/user";

const routes = express.Router();

const createUserController = new CreateUserController();

routes.post("/", createUserController.handle);

export default routes;

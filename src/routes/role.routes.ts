import express from "express";
import { CreateRoleController } from "src/controllers/role/CreateRoleController";

const routes = express.Router();

const createRoleController = new CreateRoleController();

routes.post("/", createRoleController.handle);

export default routes;

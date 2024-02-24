import express from "express";
import {
  CreateRoleController,
  DeleteRoleController,
  FindRoleController,
} from "src/controllers/role";

const routes = express.Router();

const createRoleController = new CreateRoleController();
const deleteRoleController = new DeleteRoleController();
const findRoleController = new FindRoleController();

routes.get("/");
routes.post("/", createRoleController.handle);
routes.get("/:id", findRoleController.handle);
routes.put("/:id");
routes.delete("/:id", deleteRoleController.handle);

export default routes;

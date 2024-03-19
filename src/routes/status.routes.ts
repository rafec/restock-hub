import express from "express";
import {
  CreateStatusController,
  DeleteStatusController,
  FindAllStatusController,
  FindStatusController,
} from "src/controllers/status";

const routes = express.Router();

const createStatusController = new CreateStatusController();
const deleteStatusController = new DeleteStatusController();
const findAllStatusController = new FindAllStatusController();
const findStatusController = new FindStatusController();

routes.get("/", findAllStatusController.handle);
routes.post("/", createStatusController.handle);
routes.get("/:id", findStatusController.handle);
routes.delete("/:id", deleteStatusController.handle);

export default routes;

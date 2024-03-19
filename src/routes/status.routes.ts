import express from "express";
import {
  CreateStatusController,
  DeleteStatusController,
  FindAllStatusController,
} from "src/controllers/status";

const routes = express.Router();

const createStatusController = new CreateStatusController();
const deleteStatusController = new DeleteStatusController();
const findAllStatusController = new FindAllStatusController();

routes.get("/", findAllStatusController.handle);
routes.post("/", createStatusController.handle);
routes.delete("/:id", deleteStatusController.handle);

export default routes;

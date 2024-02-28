import express from "express";
import {
  CreateDemandController,
  DeleteDemandController,
} from "src/controllers/demand";

const routes = express.Router();

const createDemandController = new CreateDemandController();
const deleteDemandController = new DeleteDemandController();

routes.post("/", createDemandController.handle);
routes.delete("/:id", deleteDemandController.handle);

export default routes;

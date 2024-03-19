import express from "express";
import { CreateStatusController } from "src/controllers/status";

const routes = express.Router();

const createStatusController = new CreateStatusController();

routes.post("/", createStatusController.handle);

export default routes;

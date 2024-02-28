import express from "express";
import { CreateDemandController } from "src/controllers/demand";

const routes = express.Router();

const createDemandController = new CreateDemandController();

routes.post("/", createDemandController.handle);

export default routes;

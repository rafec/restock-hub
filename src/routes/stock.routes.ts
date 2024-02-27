import express from "express";
import { CreateStockController } from "src/controllers/stock";

const routes = express.Router();

const createStockController = new CreateStockController();

routes.post("/", createStockController.handle);

export default routes;

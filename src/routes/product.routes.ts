import express from "express";
import { CreateProductController } from "src/controllers/product";

const routes = express.Router();

const createProductController = new CreateProductController();

routes.post("/", createProductController.handle);

export default routes;

import express from "express";
import {
  CreateProductController,
  DeleteProductController,
} from "src/controllers/product";

const routes = express.Router();

const createProductController = new CreateProductController();
const deleteProductController = new DeleteProductController();

routes.post("/", createProductController.handle);
routes.delete("/:id", deleteProductController.handle);

export default routes;

import express from "express";
import {
  CreateTransactionController,
  DeleteTransactionController,
} from "src/controllers/transaction";

const routes = express.Router();

const createTransactionController = new CreateTransactionController();
const deleteTransactionController = new DeleteTransactionController();

routes.post("/", createTransactionController.handle);
routes.delete("/:id", deleteTransactionController.handle);

export default routes;

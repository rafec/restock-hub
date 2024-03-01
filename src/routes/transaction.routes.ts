import express from "express";
import {
  CreateTransactionController,
  DeleteTransactionController,
  FindAllTransactionsController,
} from "src/controllers/transaction";

const routes = express.Router();

const createTransactionController = new CreateTransactionController();
const deleteTransactionController = new DeleteTransactionController();
const findAllTransactionsController = new FindAllTransactionsController();

routes.get("/", findAllTransactionsController.handle);
routes.post("/", createTransactionController.handle);
routes.delete("/:id", deleteTransactionController.handle);

export default routes;

import express from "express";
import { CreateTransactionController } from "src/controllers/transaction";

const routes = express.Router();

const createTransactionController = new CreateTransactionController();

routes.post("/", createTransactionController.handle);

export default routes;

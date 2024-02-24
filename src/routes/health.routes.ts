import express, { Request, Response } from "express";

const routes = express.Router();

routes.get("/", (request: Request, response: Response) => {
  response
    .status(200)
    .json({ message: "Operation succesfull.", data: "API working." });
});

export default routes;

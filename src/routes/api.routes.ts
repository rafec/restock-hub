import express, { Request, Response } from "express";
import status from "src/api/v1/status";

const routes = express.Router();

routes.get("/v1/status", async (request: Request, response: Response) => {
  await status(request, response);
});

export default routes;

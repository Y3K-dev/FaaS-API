import { FastifyInstance } from "fastify";
import { functionController } from "./function.controller";

export async function functionRoute (app: FastifyInstance) {
  app.get(
    "/:hash/userFunction", 
    functionController
  );
};
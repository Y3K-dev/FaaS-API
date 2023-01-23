import { FastifyInstance } from "fastify";
import { deployController } from "./deploy.controller";

export async function deployRoute (app: FastifyInstance) {
  app.post(
    "/deploy",
    deployController
  )
};
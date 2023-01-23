import { FastifyInstance } from "fastify";
import { verifyController } from "./verify.controller";

export async function verifyRoute (app: FastifyInstance) {
  app.get(
    "/verify",
    verifyController
  )
};
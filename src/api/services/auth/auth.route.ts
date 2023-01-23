import { FastifyInstance } from "fastify";
import { authController } from "./auth.controller";

export async function authRoute (app: FastifyInstance) {
  app.post(
    "/auth",
    authController
  )
};
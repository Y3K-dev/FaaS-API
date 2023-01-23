import { FastifyRequest, FastifyReply } from "fastify";
import { resultQuery, tokenParam } from "./function.schema";

export async function functionController (request: FastifyRequest, reply: FastifyReply) {
  const { result } = request.query as resultQuery;
  const { compressedToken } = request.params as tokenParam;
  
  reply.status(200).send({
    status: 200,
    message: "ok",
    result
  });
};
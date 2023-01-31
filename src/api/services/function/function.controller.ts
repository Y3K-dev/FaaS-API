import { FastifyRequest, FastifyReply } from "fastify";

import { redisClient } from "../../helpers/redis";
import { hashParam } from "./function.schema";

export async function functionController (request: FastifyRequest, reply: FastifyReply) {
  const { hash } = request.params as hashParam;
  
  const data = await redisClient.get(hash);

  if (!data) {
    return reply.status(400).send({
      message: "bad request",
    });
  } else {
    const result = JSON.parse(data).result;
    reply.status(200).send({
      result,
    });
  };

  reply.status(200).send({
    message: "ok",
  });
};
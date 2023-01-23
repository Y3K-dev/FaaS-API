import { FastifyRequest, FastifyReply } from "fastify";

export async function verifyController (
  request: FastifyRequest, reply: FastifyReply) {
  
  const token = request.headers.authorization;

  if (token) {
    reply.status(200).send({
      status: 200,
      message: "success"
    });
  }

  reply.status(401).send({
    status: 401,
    message: "unauthorized"
  });
};
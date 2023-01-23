import { FastifyRequest, FastifyReply } from "fastify";
import crypto from "crypto";
import { config } from "dotenv";

import { client } from "../../helpers/redis";
import { authEmailSchema } from "./auth.schema";

config({path: require("path").resolve(__dirname, "../../../config/.env")});

async function cacheHash (email: string, hash: string) {
  await client.set(email, hash);
};

export async function authController (
  request: FastifyRequest<{Body: authEmailSchema}>, reply: FastifyReply) {
  
  const { email } = request.body;
 
  if (email === "" || email === undefined) {
    reply.status(400).send({
      status: 400,
      message: "email is required"
    });
  }; 

  if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
    reply.status(400).send({
      status: 400,
      message: "invalid email"
    });
  };

  const hash = crypto.createHash(process.env.HASH_ALGORITHM as string)
                     .update(email)
                     .digest("hex");

  const hashCache = await client.get(hash);
  
  if (hashCache) {
    reply.status(409).send({
      status: 409,
      message: "conflict"
    });
  } else {
    await cacheHash(email, hash);

    reply.header("Authorization", `Bearer ${hash}`);
    reply.status(200).send({
      status: 200,
      message: "success"
    });
  };
};
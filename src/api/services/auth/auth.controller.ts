import { FastifyRequest, FastifyReply } from "fastify";
import crypto from "crypto";
import { config } from "dotenv";

import { redisClient } from "../../helpers/redis";
import { authEmailSchema } from "./auth.schema";

config({path: require("path").resolve(__dirname, "../../../config/.env")});

async function cacheHash (hash: string, email: string) {
  await redisClient.set(hash, email);
};

export async function authController (
  request: FastifyRequest<{Body: authEmailSchema}>, reply: FastifyReply) {
  
  const { email } = request.body;
 
  if (email === "" || email === undefined) {
    reply.status(400).send({
      message: "email is required"
    });
  }; 

  if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
    reply.status(400).send({
      message: "invalid email"
    });
  };

  const hash = crypto.createHash(process.env.HASH_ALGORITHM as string)
                     .update(email)
                     .digest("hex");

  const hashCache = await redisClient.get(hash);
  
  if (hashCache) {
    reply.status(409).send({
      message: "conflict"
    });
  } else {
    await cacheHash(hash, email);

    reply.header("Authorization", `Bearer ${hash}`);
    reply.status(200).send({
      message: "success"
    });
  };
};
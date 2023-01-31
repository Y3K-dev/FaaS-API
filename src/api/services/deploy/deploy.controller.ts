import { FastifyRequest, FastifyReply } from "fastify";
import vm from "vm2";

import { redisClient } from "../../helpers/redis";
import { userCode } from "./deploy.schema";

async function vm_run(code: string) {
  const sandbox = { x: 1 };
  const vmInstanceConfig = {
    timeout: 1000,
    sandbox,
    sandBoxed: {
      clearTimeout: true,
      clearInterval: true,
    },
  };

  const vmInstance = new vm.VM(vmInstanceConfig);
  const result = vmInstance.run(code);

  return result;
};

export async function deployController (
  request: FastifyRequest<{Body: userCode}>, reply: FastifyReply) {

  const hash = request.headers.authorization as string;

  if (!hash || hash === "") {
    reply.status(401).send({
      message: "unauthorized"
    });
  };

  const { code, language } = request.body;

  if (!code) {
    reply.status(400).send({
      message: "invalid code"
    });
  };

  switch (language) {
  case "javascript":
    //TODO use docker
    const result: string | number = await vm_run(code);

    /* 
      Response body:
      {
      "code": "function ok() {return 1}; ok();",
      "language": "javascript"
      }
    */ 

    const email = await redisClient.get(hash);
    const data = JSON.stringify({ email, result });

    await redisClient.set(hash.split(" ")[1], data);

    reply.status(200).send({
        message: "function deployed",
        result
    });
    
    break;
  case "python":
    reply.status(400).send({
      message: "python runner soon™"
    });
    break; 
  };
};
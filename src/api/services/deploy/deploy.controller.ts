import { FastifyRequest, FastifyReply } from "fastify";
import axios from "axios";
import vm from "vm2";

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
  
  const token = request.headers.authorization;

  if (!token || token === "") {
    reply.status(401).send({
      status: 401,
      message: "unauthorized"
    });
  };

  const { code, language } = request.body;

  if (!code || code === "") {
    reply.status(400).send({
      status: 400,
      message: "invalid code"
    });
  };

  switch (language) {
    case "javascript":
      //TODO use docker
      const result = await vm_run(code);

      /* 
        Response body:
        {
         "code": "function ok() {return 1}; ok();",
         "language": "javascript"
        }
      */

     const compressedToken = (token?.slice(0, 10)) as string; 
     const response = await axios.get(`http://localhost:3000/api/v1/${compressedToken}/userFunction?result=${result}`);

     reply.status(200).send({
        status: 200,
        message: "function deployed",
        data: response.data
      });
      
      break;
    case "python":
      reply.status(400).send({
        status: 400,
        message: "python runner soon™"
      });
      break; 
  };
};
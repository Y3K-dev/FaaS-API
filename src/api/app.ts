import fastify, { FastifyInstance, FastifyReply } from "fastify";

import { client } from "./helpers/redis";

// Routes
import { authRoute } from "./services/auth/auth.route";
import { verifyRoute } from "./services/verification/verify.route";
import { deployRoute } from "./services/deploy/deploy.route";
import { functionRoute } from "./services/function/function.route";

const server: FastifyInstance = fastify();

(async () => {
  await server.register(authRoute, { prefix: "/api/v1" });
  await server.register(verifyRoute, { prefix: "/api/v1" });
  await server.register(deployRoute, { prefix: "/api/v1" });
  await server.register(functionRoute, { prefix: "/api/v1" });
})();


//TODO deploy to railway 

//** startup & shutdown events */

server.addHook("onReady", async () => {
  console.log("server ready");

  if (await client.ping()) {
    console.log("redis ready");
  };
});

server.addHook("onClose", async (_instance,) => {
  await client.quit();
  console.log("redis closed");
  console.log("server closed");
});

//** HTTP error codes */
server.get("*", async (_request, reply: FastifyReply) => {
  reply.code(404).send({ 
    error: "404",
    message: "not found" 
  });
});

server.listen({ port: 3000 });
import { createClient } from "redis";
import { config } from "dotenv";

config({path: require("path").resolve(__dirname, "../../config/.env")});

export const redisClient = createClient({
  url: process.env.REDIS_URL, 
});

(async () => {
  await redisClient.connect();
})();

redisClient.on("error", (err: Error) => {
  console.log(`redis error: ${err}`);
});
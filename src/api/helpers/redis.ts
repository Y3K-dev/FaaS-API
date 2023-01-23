import { createClient } from "redis";
import { config } from "dotenv";

config({path: require("path").resolve(__dirname, "../../config/.env")});

export const client = createClient({
  url: process.env.REDIS_URL, 
});

(async () => {
  await client.connect();
})();

client.on("error", (err: Error) => {
  console.log(`redis error: ${err}`);
});
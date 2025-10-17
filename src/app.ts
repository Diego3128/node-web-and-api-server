import { Server } from "./presentation/server";
import { envs } from "./config/envs";

(async () => {
  await main();
})();

async function main() {
  const server = new Server(envs.PUBLIC_PATH, envs.PORT);
  server.start();
}

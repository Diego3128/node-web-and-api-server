import { config } from "dotenv";
import * as env from "env-var";

config(); //loads from /.env

export const envs = {
  PORT: env.get("PORT").default(3001).asPortNumber(),
  PUBLIC_PATH: env.get("PUBLIC_PATH").default("public").asString(),
  PROD: env.get("PROD").default("false").asBool(),
};

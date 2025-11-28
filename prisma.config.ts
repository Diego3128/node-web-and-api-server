import { config } from "dotenv";
import { defineConfig, env } from "prisma/config";

config(); // Load environment variables from .env file

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("POSTGRES_URL"),
  },
});

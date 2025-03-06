import { defineConfig } from "drizzle-kit";
import 'dotenv/config';

export default defineConfig({
    schema: "./server/db/schema.ts",
    out: "./server/db/migrations",
    dialect: 'sqlite',
    driver: 'd1-http',
    dbCredentials: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
    token: process.env.CLOUDFLARE_D1_TOKEN!,
  },
});

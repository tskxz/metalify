import {bands} from "../../db/schema";
import { drizzle } from "drizzle-orm/d1";

 export default defineEventHandler(async (event) => {
     const env = event.context.cloudflare.env as Env
     const db = drizzle(env.DB);
     return await db.select().from(bands)
 })
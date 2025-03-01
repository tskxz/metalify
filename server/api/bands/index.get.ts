import {db} from "../../db";
import {bands} from "../../db/schema";

 export default defineEventHandler(async () => {
     return await db.select().from(bands)
 })
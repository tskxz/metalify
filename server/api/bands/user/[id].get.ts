import {db} from "../../../db";
import {bands} from "../../../db/schema"
import {eq} from "drizzle-orm"

export default defineEventHandler(async (event) => {
    const userID = event.context.params?.id;
    return await db.select().from(bands).where(eq(bands.userId, Number(userID)))
})
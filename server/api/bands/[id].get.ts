import {db} from "../../db";
import {bands} from "../../db/schema"
import {eq} from "drizzle-orm"

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;
    return await db.select().from(bands).where(eq(bands.id, Number(id)))
})
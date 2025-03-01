import {db} from "../../db";
import {bands} from "../../db/schema";
import {eq} from "drizzle-orm"

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;
    await db.delete(bands).where(eq(bands.id, Number(id)))
    return {message: "Band deleted!"}
})
import {db} from "../../db";
import {albums} from "../../db/schema"
import {eq} from "drizzle-orm"

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id
    return await db.select().from(albums).where(eq(albums.id, Number(id)))
})
import {db} from "../../db"
import {songs} from "~/server/db/schema";
import {eq} from "drizzle-orm"

export default defineEventHandler(async(event) => {
    const id = event.context.params?.id
    return await db.select().from(songs).where(eq(songs.id, Number(id)))

})
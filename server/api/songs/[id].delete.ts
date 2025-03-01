import {db} from "../../db"
import {songs} from "../../db/schema"
import {eq} from "drizzle-orm"

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id
    await db.delete(songs).where(eq(songs.id, Number(id)))
    return {message: "Song deleted!"}
})
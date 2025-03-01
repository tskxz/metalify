import {db} from "../../db"
import {songs} from "~/server/db/schema";
import {eq} from "drizzle-orm"

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id
    const body = await readBody(event)

    await db.update(songs).set(body).where(eq(songs.id, Number(id)))

    return {message: "Song updated!"}
})
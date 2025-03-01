import {db} from "../../db"
import {songs} from "../../db/schema"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    await db.insert(songs).values(body)
    return {message: "Song added successfully"}
})
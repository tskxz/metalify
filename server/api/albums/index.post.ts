import {db} from "../../db"
import {albums} from "../../db/schema"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    await db.insert(albums).values(body)
    return {message: "Album added successfully!"}
})
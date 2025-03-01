import {db} from "../../db"
import {songs} from "~/server/db/schema";

export default defineEventHandler(async() => {
    return await db.select().from(songs)
})
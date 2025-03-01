import {db} from "../../db"
import {albums} from "../../db/schema";

export default defineEventHandler(async (event) => {
    return await db.select().from(albums)
})
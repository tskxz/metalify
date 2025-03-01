import {db} from "../../db"
import {albums} from "~/server/db/schema";
import {eq} from "drizzle-orm"

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;
    await db.delete(albums).where(eq(albums.id, Number(id)))
    return {message: "Album deleted!"}
})
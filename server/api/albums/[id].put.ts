import {db} from "../../db";
import {albums} from "~/server/db/schema";
import {eq} from "drizzle-orm";

export default defineEventHandler(async(event)=>{
    const id = event.context.params?.id;
    const body = await readBody(event);

    await db.update(albums).set(body).where(eq(albums.id, Number(id)))

    return {message: "Album updated!"}
})
import {db} from "../../db"
import {bands} from '../../db/schema'
import {eq} from "drizzle-orm"

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id
    const body = await readBody(event);

    await db.update(bands).set(body).where(eq(bands.id, Number(id)));

    return {message: "Band updated!"}
})

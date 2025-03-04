import {db} from '../../db';
import {bands} from "../../db/schema"

export default defineEventHandler(async (event) => {
    const user = event.context.user

    const body = await readBody(event)
    const newBand = await db.insert(bands).values(body);
    return {message: "Band added successfully 🎸", band: newBand};
})
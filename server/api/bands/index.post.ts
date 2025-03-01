import {db} from '../../db';
import {bands} from "../../db/schema"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    await db.insert(bands).values(body);
    return {message: "Band added successfully 🎸"};
})
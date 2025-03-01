import { db } from "../../db";
import { albums } from "../../db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const albumId = query.id ? Number(query.id) : null;
    const bandId = query.bandId ? Number(query.bandId) : null;

    if (albumId) {
        return await db.select().from(albums).where(eq(albums.id, albumId));
    }

    if (bandId) {
        return await db.select().from(albums).where(eq(albums.bandId, bandId));
    }

    return await db.select().from(albums); 
});

import {db} from "../../db"
import {songs} from "~/server/db/schema";
import {eq} from "drizzle-orm"

export default defineEventHandler(async(event) => {
    const query = getQuery(event);
    const songId = query.id ? Number(query.id) : null;
    const albumId = query.albumId ? Number(query.albumId) : null
    const bandId = query.bandId ? Number(query.bandId) : null

    if(songId){
        return await db.select().from(songs).where(eq(songs.id, Number(songId)))
    }

    if(albumId){
        return await db.select().from(songs).where(eq(songs.albumId, Number(albumId)))
    }

    if(songId){
        return await db.select().from(songs).where(eq(songs.bandId, Number(bandId)))
    }


    return await db.select().from(songs)
})
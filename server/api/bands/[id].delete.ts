import { db } from "../../db";
import { bands, albums, songs } from "../../db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  await db.delete(songs).where(eq(songs.bandId, Number(id)));
  await db.delete(albums).where(eq(albums.bandId, Number(id)));
  await db.delete(bands).where(eq(bands.id, Number(id)));

  return { message: "Band deleted!" };
});

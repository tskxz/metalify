import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const bands = sqliteTable("bands", {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    genre: text("genre"),
    imageUrl: text("image_url")
});

export const albums = sqliteTable("albums", {
    id: integer("id").primaryKey(),
    title: text("title").notNull(),
    bandId: integer("band_id").notNull().references(() => bands.id),
    imageUrl: text("image_url")

});

export const songs = sqliteTable("songs", {
    id: integer("id").primaryKey(),
    title: text("title").notNull(),
    albumId: integer("album_id").notNull().references(() => albums.id),
    bandId: integer("band_id").notNull().references(() => bands.id),
    youtubeUrl: text("youtube_url").notNull(),
});

export const bandsRelations = relations(bands, ({ many }) => ({
    albums: many(albums),
}));

export const albumsRelations = relations(albums, ({ one, many }) => ({
    band: one(bands, { fields: [albums.bandId], references: [bands.id] }),
    songs: many(songs),
}));

export const songsRelations = relations(songs, ({ one }) => ({
    album: one(albums, { fields: [songs.albumId], references: [albums.id] }),
    band: one(bands, { fields: [songs.bandId], references: [bands.id] }),
}));

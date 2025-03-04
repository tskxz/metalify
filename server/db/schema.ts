import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull()
})

export const bands = sqliteTable("bands", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  genre: text("genre"),
  imageUrl: text("image_url"),
  userId: integer("user_id").notNull().references(() => users.id)
});

export const albums = sqliteTable("albums", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  userId: integer("user_id").notNull().references(() => users.id),
  bandId: integer("band_id").notNull().references(() => bands.id),
  imageUrl: text("image_url"),
});

export const songs = sqliteTable("songs", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  albumId: integer("album_id").notNull().references(() => albums.id),
  bandId: integer("band_id").notNull().references(() => bands.id),
  userId: integer("user_id").notNull().references(() => users.id),
  youtubeUrl: text("youtube_url").notNull(),
});

export const usersRelations = relations(users, ({many}) => ({
  bands: many(bands),
  albums: many(albums),
  songs: many(songs),
}))

export const bandsRelations = relations(bands, ({ many }) => ({
  albums: many(albums),
  user: one(users),
}));

export const albumsRelations = relations(albums, ({ one, many }) => ({
  band: one(bands, { fields: [albums.bandId], references: [bands.id] }),
  songs: many(songs),
  user: one(users),
}));

export const songsRelations = relations(songs, ({ one }) => ({
  album: one(albums, { fields: [songs.albumId], references: [albums.id] }),
  band: one(bands, { fields: [songs.bandId], references: [bands.id] }),
  user: one(users, {fields: [songs.userId], references: [users.id]})
}));

PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_albums` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`band_id` integer NOT NULL,
	`image_url` text,
	FOREIGN KEY (`band_id`) REFERENCES `bands`(`id`) ON UPDATE no action ON DELETE CASCADE
);
--> statement-breakpoint
INSERT INTO `__new_albums`("id", "title", "band_id", "image_url") SELECT "id", "title", "band_id", "image_url" FROM `albums`;--> statement-breakpoint
DROP TABLE `albums`;--> statement-breakpoint
ALTER TABLE `__new_albums` RENAME TO `albums`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_songs` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`album_id` integer NOT NULL,
	`band_id` integer NOT NULL,
	`youtube_url` text NOT NULL,
	FOREIGN KEY (`album_id`) REFERENCES `albums`(`id`) ON UPDATE no action ON DELETE CASCADE,
	FOREIGN KEY (`band_id`) REFERENCES `bands`(`id`) ON UPDATE no action ON DELETE CASCADE
);
--> statement-breakpoint
INSERT INTO `__new_songs`("id", "title", "album_id", "band_id", "youtube_url") SELECT "id", "title", "album_id", "band_id", "youtube_url" FROM `songs`;--> statement-breakpoint
DROP TABLE `songs`;--> statement-breakpoint
ALTER TABLE `__new_songs` RENAME TO `songs`;
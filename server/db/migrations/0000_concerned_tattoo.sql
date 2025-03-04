CREATE TABLE `albums` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`band_id` integer NOT NULL,
	FOREIGN KEY (`band_id`) REFERENCES `bands`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `bands` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`genre` text
);
--> statement-breakpoint
CREATE TABLE `songs` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`album_id` integer NOT NULL,
	`band_id` integer NOT NULL,
	`youtube_url` text NOT NULL,
	FOREIGN KEY (`album_id`) REFERENCES `albums`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`band_id`) REFERENCES `bands`(`id`) ON UPDATE no action ON DELETE no action
);

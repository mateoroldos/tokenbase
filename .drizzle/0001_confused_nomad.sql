CREATE TABLE `email_verification_token` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(15) NOT NULL,
	`expires` bigint NOT NULL,
	CONSTRAINT `email_verification_token_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `password_reset_token` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(15) NOT NULL,
	`expires` bigint NOT NULL,
	CONSTRAINT `password_reset_token_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `auth_user` ADD `email` varchar(255);--> statement-breakpoint
ALTER TABLE `auth_user` ADD `email_verified` boolean;--> statement-breakpoint
ALTER TABLE `auth_user` DROP COLUMN `names`;--> statement-breakpoint
ALTER TABLE `auth_user` DROP COLUMN `last_names`;
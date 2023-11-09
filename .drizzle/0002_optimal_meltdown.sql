ALTER TABLE `auth_user` MODIFY COLUMN `username` varchar(55) NOT NULL;--> statement-breakpoint
ALTER TABLE `auth_user` MODIFY COLUMN `email` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `auth_user` MODIFY COLUMN `email_verified` boolean NOT NULL;--> statement-breakpoint
ALTER TABLE `auth_user` ADD CONSTRAINT `auth_user_username_unique` UNIQUE(`username`);
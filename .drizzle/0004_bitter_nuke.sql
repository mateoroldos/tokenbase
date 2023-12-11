ALTER TABLE `auth_user` MODIFY COLUMN `id` varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE `auth_user` ADD CONSTRAINT `auth_user_email_unique` UNIQUE(`email`);
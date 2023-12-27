CREATE TABLE `design_system` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`workspace_id` varchar(255) NOT NULL,
	CONSTRAINT `design_system_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `workspace` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`owner_id` varchar(15) NOT NULL,
	CONSTRAINT `workspace_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `workspace_member` (
	`workspace_id` varchar(255) NOT NULL,
	`user_id` varchar(15) NOT NULL
);

CREATE TABLE `otps` (
	`id` int AUTO_INCREMENT NOT NULL,
	`mobile` varchar(20) NOT NULL,
	`otp` varchar(10) NOT NULL,
	`expires_at` datetime NOT NULL,
	`verified` boolean NOT NULL DEFAULT false,
	CONSTRAINT `otps_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `gender` varchar(20);--> statement-breakpoint
ALTER TABLE `users` ADD `dob` datetime;
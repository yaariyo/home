ALTER TABLE `users` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `email_verified` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `email_verification_token` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `email_verification_token_expiry` int;
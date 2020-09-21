DROP DATABASE IF EXISTS POD_DB;
CREATE DATABASE POD_DB;

-- USE pod_db;

-- CREATE TABLE `users` (
--   `id` integer PRIMARY KEY AUTO_INCREMENT,
--   `role` varchar(255),
--   `email` varchar(255),
--   `password` varchar(255)
-- );

-- CREATE TABLE `user_roles` (
--   `user_id` integer,
--   `role_id` integer
-- );

-- CREATE TABLE `roles` (
--   `id` integer PRIMARY KEY AUTO_INCREMENT,
--   `name` varchar(255)
-- );

-- CREATE TABLE `user_classes` (
--   `date_completed` date,
--   `user_id` integer,
--   `classes_id` integer
-- );

-- CREATE TABLE `classes` (
--   `id` integer PRIMARY KEY AUTO_INCREMENT,
--   `name` varchar(255),
--   `date_created` date,
--   `date_updated` date,
--   `user_id` integer
-- );

-- CREATE TABLE `lessons` (
--   `id` integer PRIMARY KEY AUTO_INCREMENT,
--   `name` varchar(255),
--   `text` varchar(255),
--   `description` varchar(255),
--   `date_completed` date,
--   `date_created` date,
--   `date_updated` date,
--   `classes_id` integer
-- );

-- CREATE TABLE `classes_content` (
--   `content_id` integer,
--   `lesson_id` integer
-- );

-- CREATE TABLE `content` (
--   `id` integer PRIMARY KEY AUTO_INCREMENT,
--   `name` varchar(255),
--   `url` varchar(255),
--   `date_created` date
-- );

-- ALTER TABLE `user_roles` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

-- ALTER TABLE `user_roles` ADD FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

-- ALTER TABLE `user_classes` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

-- ALTER TABLE `user_classes` ADD FOREIGN KEY (`classes_id`) REFERENCES `classes` (`id`);

-- ALTER TABLE `classes` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

-- ALTER TABLE `lessons` ADD FOREIGN KEY (`classes_id`) REFERENCES `classes` (`id`);

-- ALTER TABLE `classes_content` ADD FOREIGN KEY (`content_id`) REFERENCES `content` (`id`);

-- ALTER TABLE `classes_content` ADD FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`);
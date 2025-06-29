-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 29, 2025 at 04:57 AM
-- Server version: 5.7.24
-- PHP Version: 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blogapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `body` varchar(3000) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `body`, `created_at`, `updated_at`, `user_id`) VALUES
(1, 'My Travel Adventures', 'This is Alice\'s blog. I love exploring new countries and cultures.', '2025-06-29 01:07:30', '2025-06-29 01:07:30', 1),
(2, 'Photography 101', 'This is Alice\'s blog. Basics of photography for beginners.', '2025-06-29 01:07:30', '2025-06-29 01:07:30', 1),
(3, 'JavaScript Tips', 'This is Bob\'s blog. Today I want to share some cool JS tricks.', '2025-06-29 01:07:30', '2025-06-29 01:07:30', 2),
(4, 'Healthy Living', 'This is Charlie\'s blog. 10 tips to stay healthy and active.', '2025-06-29 01:07:30', '2025-06-29 01:07:30', 3),
(5, 'Digital Marketing Basics', 'This is Diana\'s blog. Learn the foundations of digital marketing.', '2025-06-29 01:07:30', '2025-06-29 01:07:30', 4),
(6, 'Mission Strategies', 'This is Ethan\'s blog. Discussing secret mission strategies and teamwork.', '2025-06-29 01:07:30', '2025-06-29 01:07:30', 5),
(7, 'Vegan Recipes', 'This is Fiona\'s blog. Delicious and easy vegan recipes to try.', '2025-06-29 01:07:30', '2025-06-29 01:07:30', 6),
(8, 'Yoga for Beginners', 'This is Fiona\'s blog. A guide to starting yoga for health and relaxation.', '2025-06-29 01:07:30', '2025-06-29 01:07:30', 6);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `date_of_birth` date NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(20) NOT NULL,
  `confirmed` tinyint(1) DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `date_of_birth`, `email`, `password`, `confirmed`, `created_at`, `updated_at`) VALUES
(1, 'Alice', 'Smith', '1995-03-15', 'alice@example.com', 'password1', 0, '2025-06-29 01:06:01', '2025-06-29 01:06:01'),
(2, 'Bob', 'Johnson', '1988-06-22', 'bob@example.com', 'password2', 0, '2025-06-29 01:06:01', '2025-06-29 01:06:01'),
(3, 'Charlie', 'Brown', '1990-12-05', 'charlie@example.com', 'password3', 0, '2025-06-29 01:06:01', '2025-06-29 01:06:01'),
(4, 'Diana', 'White', '1992-09-09', 'diana@example.com', 'password4', 0, '2025-06-29 01:06:01', '2025-06-29 01:06:01'),
(5, 'Ethan', 'Hunt', '1985-11-30', 'ethan@example.com', 'password5', 0, '2025-06-29 01:06:01', '2025-06-29 01:06:01'),
(6, 'Fiona', 'Green', '1998-07-17', 'fiona@example.com', 'password6', 0, '2025-06-29 01:06:01', '2025-06-29 01:06:01'),
(7, 'John', 'Doe', '1990-05-20', 'john@example.com', '123456', 0, '2025-06-29 04:46:19', '2025-06-29 04:46:19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id_FK` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blogs`
--
ALTER TABLE `blogs`
  ADD CONSTRAINT `user_id_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

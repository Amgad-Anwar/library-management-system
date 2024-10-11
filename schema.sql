CREATE DATABASE IF NOT EXISTS bosta_library_management_system;

USE bosta_library_management_system;

CREATE TABLE IF NOT EXISTS users (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS books (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `isbn` varchar(13) DEFAULT NULL,
  `available_quantity` int(11) DEFAULT NULL,
  `shelf_location` varchar(255) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS borrowers (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `registered_date` date DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS borrow_records (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `borrower_id` int(11) DEFAULT NULL,
  `book_id` int(11) DEFAULT NULL,
  `borrow_date` date DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `returned` tinyint(1) DEFAULT 0,
  FOREIGN KEY (borrower_id) REFERENCES borrowers(id),
  FOREIGN KEY (book_id) REFERENCES books(id)
);

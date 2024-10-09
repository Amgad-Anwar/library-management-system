CREATE DATABASE IF NOT EXISTS bosta_library_management_system;

USE bosta_library_management_system;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  isbn VARCHAR(50) NOT NULL,
  quantity INT NOT NULL,
  shelf_location VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS borrowers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  registered_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS borrowings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  borrower_id INT,
  book_id INT,
  borrow_date DATE,
  return_date DATE,
  due_date DATE,
  FOREIGN KEY (borrower_id) REFERENCES borrowers(id),
  FOREIGN KEY (book_id) REFERENCES books(id)
);

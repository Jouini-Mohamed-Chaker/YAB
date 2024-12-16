-- Insert data into members table
INSERT INTO members (name, email, address) VALUES
('John Doe', 'john.doe@example.com', '123 Elm Street'),
('Jane Smith', 'jane.smith@example.com', '456 Oak Avenue'),
('Alice Johnson', 'alice.johnson@example.com', '789 Pine Road'),
('Bob Brown', 'bob.brown@example.com', '321 Maple Street'),
('Charlie Davis', 'charlie.davis@example.com', '654 Birch Lane');

-- Insert data into books table
INSERT INTO books (title, author, price, copies_in_stock) VALUES
('Java Fundamentals', 'Jane Smith', 29.99, 5),
('Spring Boot in Action', 'Craig Walls', 39.99, 3),
('Hibernate Basics', 'John Doe', 24.99, 7),
('REST API Design', 'Alice Johnson', 34.99, 4),
('Effective Java', 'Joshua Bloch', 49.99, 2);

-- Insert data into loans table
INSERT INTO loans (member_id, book_id, loan_date, return_date, status) VALUES
(1, 1, '2024-12-01', '2024-12-15', 'borrowed'),
(2, 2, '2024-12-02', '2024-12-16', 'borrowed'),
(3, 3, '2024-12-03', '2024-12-17', 'returned'),
(4, 4, '2024-12-04', '2024-12-18', 'borrowed'),
(5, 5, '2024-12-05', '2024-12-19', 'borrowed');

-- Insert data into staff table
INSERT INTO staff (name, email, phone_number) VALUES
('Michael Scott', 'michael.scott@example.com', '123-456-7890'),
('Pam Beesly', 'pam.beesly@example.com', '234-567-8901'),
('Jim Halpert', 'jim.halpert@example.com', '345-678-9012'),
('Dwight Schrute', 'dwight.schrute@example.com', '456-789-0123'),
('Angela Martin', 'angela.martin@example.com', '567-890-1234');
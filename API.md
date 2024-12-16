# Backend API Documentation for Library Management System

## Overview
This documentation outlines the REST API endpoints of the backend system for a library management application. It includes CRUD functionality for managing books, members, loans, and staff.

---

## API Endpoints

### **Books (`/api/books`)**

- **GET** `/api/books`  
  Retrieves all books.

- **GET** `/api/books/{id}`  
  Retrieves a single book by its ID.

- **POST** `/api/books`  
  Creates a new book.  
  **Request Body:**  
  ```json
  {
    "title": "string",
    "author": "string",
    "price": number,
    "copiesInStock": number
  }
  ```

- **PUT** `/api/books/{id}`  
  Updates an existing book by ID.  
  **Request Body:** Same as POST.

- **DELETE** `/api/books/{id}`  
  Deletes a book by ID.

---

### **Members (`/api/members`)**

- **GET** `/api/members`  
  Retrieves all members.

- **GET** `/api/members/{id}`  
  Retrieves a single member by its ID.

- **POST** `/api/members`  
  Creates a new member.  
  **Request Body:**  
  ```json
  {
    "name": "string",
    "email": "string",
    "address": "string"
  }
  ```

- **PUT** `/api/members/{id}`  
  Updates an existing member by ID.  
  **Request Body:** Same as POST.

- **DELETE** `/api/members/{id}`  
  Deletes a member by ID.

---

### **Loans (`/api/loans`)**

- **GET** `/api/loans`  
  Retrieves all loans.

- **GET** `/api/loans/{id}`  
  Retrieves a single loan by its ID.

- **POST** `/api/loans`  
  Creates a new loan.  
  **Request Body:**  
  ```json
  {
    "member": { "id": number },
    "book": { "bookId": number },
    "loanDate": "YYYY-MM-DD",
    "returnDate": "YYYY-MM-DD",
    "status": "string"
  }
  ```

- **PUT** `/api/loans/{id}`  
  Updates an existing loan by ID.  
  **Request Body:** Same as POST.

- **DELETE** `/api/loans/{id}`  
  Deletes a loan by ID.

---

### **Staff (`/api/staff`)**

- **GET** `/api/staff`  
  Retrieves all staff members.

- **GET** `/api/staff/{id}`  
  Retrieves a single staff member by their ID.

- **POST** `/api/staff`  
  Creates a new staff member.  
  **Request Body:**  
  ```json
  {
    "name": "string",
    "email": "string",
    "phoneNumber": "string"
  }
  ```

- **PUT** `/api/staff/{id}`  
  Updates an existing staff member by ID.  
  **Request Body:** Same as POST.

- **DELETE** `/api/staff/{id}`  
  Deletes a staff member by ID.

---

## Data Models

### **Book**
- `bookId` (Long)  
- `title` (String)  
- `author` (String)  
- `price` (Double)  
- `copiesInStock` (Long)  
- Relationships: One-to-Many with Loans (`List<Loan>`)

### **Member**
- `id` (Long)  
- `name` (String)  
- `email` (String)  
- `address` (String)  
- Relationships: One-to-Many with Loans (`List<Loan>`)

### **Loan**
- `loanId` (Long)  
- `member` (Member)  
- `book` (Book)  
- `loanDate` (LocalDate)  
- `returnDate` (LocalDate)  
- `status` (String)  

### **Staff**
- `id` (Long)  
- `name` (String)  
- `email` (String)  
- `phoneNumber` (String)


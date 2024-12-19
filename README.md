# Project Name: Library Management System

This project is a full-stack library management system that consists of two parts:

1. **Backend**: A Spring Boot application that manages books, members, loans, and staff.
2. **Frontend**: A React application built using Vite for fast development and efficient bundling.

The backend exposes a set of RESTful APIs for managing library data, while the frontend provides an admin interface to interact with the library system.

## Requirements

- **Backend**: Java 21 or later, Maven
- **Frontend**: Node.js (v22 or later), npm

## How to Run the Project

1. **Backend**:  
   Navigate to the `springboot-backend` directory and run:

   ```bash
   ./mvnw spring-boot:run
   ```

   Wait for the server to start properly.

2. **Frontend**:  
   In another terminal, navigate to the `react-frontend` directory and run:
   ```bash
   npm install
   npm run dev
   ```
   Open your browser and navigate to the outputted link (usually `http://localhost:5173`).

## Accessing the Application

- **Backend**: Once the backend is running, you can access the APIs on `http://localhost:9090` (or the port specified in your `application.properties` file).
- **Frontend**: The frontend will be available at `http://localhost:5173`.

## Additional Information

- The backend is built using **Spring Boot** and exposes RESTful endpoints for managing books, members, loans, and staff.
- The frontend is a **React** application that interacts with the backend through API calls.

## Troubleshooting

- **Frontend does not start**: Make sure that the required dependencies are installed by running `npm install` inside the `react-frontend` directory.
- **Backend does not start**: Check if you have the correct Java version installed, and ensure your database is properly configured.
- **No output from the backend**: The Spring Boot output is suppressed by design. Check the backend logs or open the backend's log file if needed.

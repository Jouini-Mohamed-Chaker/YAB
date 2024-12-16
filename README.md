# Project Name: Library Management System

This project is a full-stack library management system that consists of two parts:

1. **Backend**: A Spring Boot application that manages books, members, loans, and staff.
2. **Frontend**: A React application built using Vite for fast development and efficient bundling.

The backend exposes a set of RESTful APIs for managing library data, while the frontend provides an admin interface to interact with the library system.

## Requirements

- **Backend**: Java 17 or later, Maven
- **Frontend**: Node.js (v16 or later), npm

## How to Use the `launch.sh` Script

The `launch.sh` script is used to automatically start both the **backend** and **frontend** of the project in one command. The backend will run silently, and only the frontend output will be shown in the terminal.

### Steps to Use the Script

1. **Clone the repository**:
   If you haven’t cloned the repository yet, run:

   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Ensure required dependencies are installed**:

   - **Backend**: Make sure you have Java 17 or later installed.
   - **Frontend**: Ensure Node.js and npm are installed. You can check by running:
     ```bash
     node -v
     npm -v
     ```

3. **Make the script executable**:
   If it isn’t executable already, run:

   ```bash
   chmod +x launch.sh
   ```

4. **Run the script**:
   To start both the backend and frontend, execute the script:
   ```bash
   ./launch.sh
   ```

### What Happens When You Run the Script:

- The **Spring Boot backend** will start in the background. All of its output will be suppressed, and only errors will be shown if something goes wrong.
- The **React frontend** will start and you will see the Vite development server’s output, including any compilation errors or logs from React.

### Stopping the Processes

To stop both the backend and frontend, press `Ctrl+C`. The script is designed to gracefully handle cleanup and send `Ctrl+C` to both processes.

## Accessing the Application

- **Backend**: Once the backend is running, you can access the APIs on `http://localhost:9090` (or the port specified in your `application.properties` file).
- **Frontend**: The frontend will be available at `http://localhost:5173`.

## Additional Information

- The backend is built using **Spring Boot** and exposes RESTful endpoints for managing books, members, loans, and staff.
- The frontend is a **React** application that interacts with the backend through API calls.

## Troubleshooting

- **Frontend does not start**: Make sure that the required dependencies are installed by running `npm install` inside the `frontend` directory before running the script.
- **Backend does not start**: Check if you have the correct Java version installed, and ensure your database is properly configured.
- **No output from the backend**: The Spring Boot output is suppressed by design. Check the backend logs or open the backend's log file if needed.

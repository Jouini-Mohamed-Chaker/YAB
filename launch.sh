#!/bin/bash

# Function to handle graceful cleanup on exit
cleanup() {
  echo "Gracefully stopping processes..."
  kill -SIGINT $BACKEND_PID
  kill -SIGINT $FRONTEND_PID
  wait $BACKEND_PID 2>/dev/null
  wait $FRONTEND_PID 2>/dev/null
  echo "Processes stopped gracefully."
}

# Ensure the script stops when CTRL+C is pressed
trap cleanup EXIT

# Navigate to the backend directory and start Spring Boot, suppress output
echo "Starting Spring Boot backend..."
cd springboot-backend || exit 1
./mvnw spring-boot:run > /dev/null 2>&1 &
BACKEND_PID=$!
echo "Spring Boot backend started with PID $BACKEND_PID"

# Wait a moment for the backend to start
sleep 3

# Navigate to the frontend directory and start React
echo "Starting React frontend..."
cd ../react-frontend || exit 1
npm i
npm run dev &
FRONTEND_PID=$!
echo "React frontend started with PID $FRONTEND_PID"

# Wait for both processes to exit
wait $BACKEND_PID
wait $FRONTEND_PID

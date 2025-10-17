#!/bin/bash

echo "🐟 Starting Fishr Frontend..."

cd frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing npm dependencies..."
    npm install
fi

# Start React development server
echo "Starting React development server on port 3000..."
npm start

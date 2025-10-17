#!/bin/bash

echo "🐟 Starting Fishr - Fish Detection Dashboard"
echo "=========================================="
echo ""
echo "This will start both the backend (Flask) and frontend (React)"
echo ""

# Make scripts executable
chmod +x start-backend.sh
chmod +x start-frontend.sh

# Open two terminal windows
echo "Opening backend in new terminal..."
osascript -e 'tell app "Terminal" to do script "cd \"'$(pwd)'\" && ./start-backend.sh"'

sleep 2

echo "Opening frontend in new terminal..."
osascript -e 'tell app "Terminal" to do script "cd \"'$(pwd)'\" && ./start-frontend.sh"'

echo ""
echo "✅ Fishr is starting up!"
echo ""
echo "Backend will be available at: http://localhost:5000"
echo "Frontend will be available at: http://localhost:3000"
echo ""
echo "The frontend will automatically open in your browser."

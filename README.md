# Fishr - Fish Detection & Classification Dashboard

A beautiful, modern fish detection and classification system with real-time analytics.

## Features

- 🐟 **Fish Detection & Segmentation**: AI-powered fish detection using YOLOv8
- 📊 **Real-time Dashboard**: Beautiful dark blue themed dashboard
- 📈 **Analytics**: Track daily catches, fish types, and weights
- 🎯 **Classification**: Automatic fish species identification
- 💾 **Data Storage**: SQLite database for historical tracking

## Tech Stack

- **Backend**: Flask, Python, YOLOv8, OpenCV
- **Frontend**: React, TailwindCSS, Recharts
- **Database**: SQLite
- **ML Models**: Ultralytics YOLOv8 for detection and classification

## Quick Start

### Backend Setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## API Endpoints

- `POST /api/detect` - Upload image for fish detection
- `GET /api/stats/today` - Get today's statistics
- `GET /api/catches` - Get all fish catches
- `GET /api/fish-types` - Get fish type distribution

## License

MIT

# 🐟 Fishr - Project Overview

## 📁 Project Structure

```
fish identifyer/
├── backend/                    # Flask backend
│   ├── app.py                 # Main Flask application
│   ├── fish_detector.py       # YOLOv8 detection & classification
│   ├── test_detection.py      # Testing script
│   ├── requirements.txt       # Python dependencies
│   ├── models/                # ML model storage
│   ├── uploads/               # Uploaded images
│   └── fishr.db              # SQLite database (auto-created)
│
├── frontend/                   # React frontend
│   ├── public/
│   │   └── index.html        # HTML template
│   ├── src/
│   │   ├── App.js            # Main React component
│   │   ├── App.css           # Main styling
│   │   ├── index.js          # React entry point
│   │   ├── index.css         # Global styles
│   │   └── components/       # React components
│   │       ├── UploadZone.js         # Image upload component
│   │       ├── UploadZone.css
│   │       ├── StatsCard.js          # Statistics card
│   │       ├── StatsCard.css
│   │       ├── FishTypeChart.js      # Bar chart visualization
│   │       ├── FishTypeChart.css
│   │       ├── RecentCatches.js      # Recent catches list
│   │       └── RecentCatches.css
│   └── package.json          # npm dependencies
│
├── start-all.sh               # Start both backend & frontend
├── start-backend.sh           # Start backend only
├── start-frontend.sh          # Start frontend only
├── README.md                  # Project README
├── SETUP_GUIDE.md            # Detailed setup instructions
├── QUICK_START.md            # Quick reference
├── PROJECT_OVERVIEW.md       # This file
└── .gitignore                # Git ignore rules

```

## 🎨 Design System

### Color Palette (Dark Blue Theme)

- **Background**: `#0a1929` (Deep ocean blue)
- **Secondary**: `#1a2942` (Medium dark blue)
- **Accent**: `#1e4976` (Royal blue)
- **Primary**: `#3b82f6` (Bright blue)
- **Light**: `#60a5fa` (Sky blue)
- **Text**: `#93c5fd` (Light blue)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, gradient blue
- **Body**: Regular, light blue

### Effects
- Glass-morphism cards with backdrop blur
- Smooth hover transitions
- Gradient backgrounds
- Subtle box shadows with blue glow

## 🏗️ Architecture

### Backend (Flask + Python)

**Stack:**
- Flask 3.0 (Web framework)
- Ultralytics YOLOv8 (AI detection)
- OpenCV (Image processing)
- SQLite (Database)
- Flask-CORS (Cross-origin requests)

**Key Components:**
1. **Fish Detector** (`fish_detector.py`)
   - YOLOv8n-seg model for detection
   - Fish type classification
   - Weight estimation algorithm
   - Confidence scoring

2. **REST API** (`app.py`)
   - `/api/detect` - Upload & detect
   - `/api/stats/today` - Daily statistics
   - `/api/catches` - Historical data
   - `/api/fish-types` - Type distribution

3. **Database Schema**
   ```sql
   fish_catches (
     id INTEGER PRIMARY KEY,
     fish_type TEXT,
     weight REAL,
     confidence REAL,
     image_path TEXT,
     detected_at TIMESTAMP
   )
   ```

### Frontend (React)

**Stack:**
- React 18 (UI framework)
- Axios (HTTP client)
- Recharts (Data visualization)
- React Dropzone (File upload)
- Lucide React (Icons)

**Components:**
1. **App.js** - Main application container
2. **UploadZone** - Drag-and-drop image upload
3. **StatsCard** - Individual statistic display
4. **FishTypeChart** - Bar chart for fish distribution
5. **RecentCatches** - List of recent detections

**State Management:**
- React hooks (useState, useEffect)
- Automatic data refresh every 30 seconds
- Real-time updates after uploads

## 🔄 Data Flow

1. User uploads fish image via UploadZone
2. Frontend sends POST request to `/api/detect`
3. Backend processes image with YOLOv8
4. Fish detector identifies species and estimates weight
5. Results saved to SQLite database
6. Response sent back to frontend
7. Dashboard updates with new data
8. Statistics and charts refresh automatically

## 🚀 Performance

- **Image Processing**: ~1-3 seconds per image
- **Model Size**: ~6MB (YOLOv8 Nano)
- **Database**: SQLite (lightweight, no setup)
- **Frontend Bundle**: ~2MB (optimized React build)

## 🔐 Security Considerations

- Input validation on file uploads
- CORS configured for localhost development
- SQL injection protection via parameterized queries
- File size limits on uploads

## 📊 Future Scalability

**For Production:**
- Switch to PostgreSQL for better performance
- Add Redis for caching
- Implement user authentication (JWT)
- Use cloud storage for images (S3, GCS)
- Add rate limiting
- Deploy with Docker containers
- Use nginx as reverse proxy

## 🎯 Key Features

✅ **Real-time Detection**: Instant fish detection with YOLOv8
✅ **Beautiful UI**: Premium dark blue theme
✅ **Data Persistence**: SQLite database for historical tracking
✅ **Live Dashboard**: Auto-refreshing statistics
✅ **Responsive Design**: Works on desktop, tablet, and mobile
✅ **Easy Setup**: One-command startup
✅ **Extensible**: Easy to customize and extend

---

**Built with ❤️ for fishermen and AI enthusiasts**

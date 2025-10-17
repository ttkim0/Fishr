# 🐟 Fishr - Quick Start

## One-Command Setup

```bash
./start-all.sh
```

## Manual Start

### Terminal 1 (Backend):
```bash
cd backend
source venv/bin/activate  # First time: python3 -m venv venv
python app.py
```

### Terminal 2 (Frontend):
```bash
cd frontend
npm start  # First time: npm install
```

## Access

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## First Time Setup

1. Backend will download YOLOv8 model (~6MB) on first run
2. React will install dependencies (~200MB) on first npm install
3. Total setup time: ~5-10 minutes

## Usage

1. Open http://localhost:3000
2. Drag & drop a fish image
3. View detection results instantly
4. Check dashboard for statistics

## Features At A Glance

✅ AI Fish Detection (YOLOv8)
✅ Species Classification  
✅ Weight Estimation
✅ Real-time Dashboard
✅ Statistics & Charts
✅ Historical Tracking

---

**That's it! Happy fishing! 🎣**

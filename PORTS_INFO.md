# 🐟 Fishr - Port Configuration

## ✅ Current Running Ports

**Backend (Flask + YOLOv8):**
- Port: **5555**
- URL: http://localhost:5555
- Health Check: http://localhost:5555/api/health
- Status: ✅ Running

**Frontend (React Dashboard):**
- Port: **3001**
- URL: http://localhost:3001
- Status: ✅ Running

---

## 📝 Quick Commands

### Check Status
```bash
# Backend health
curl http://localhost:5555/api/health

# Check if services are running
lsof -i :5555  # Backend
lsof -i :3001  # Frontend
```

### Stop Services
```bash
pkill -f "python app.py"
pkill -f "react-scripts start"
```

### Restart Services
```bash
# Backend
cd "/Users/terrykim/fish identifyer/backend"
source venv/bin/activate
python app.py &

# Frontend
cd "/Users/terrykim/fish identifyer/frontend"
PORT=3001 npm start &
```

---

## 🎯 Access Your Dashboard

**Main URL:** http://localhost:3001

**What to do:**
1. Open http://localhost:3001 in your browser
2. Drag & drop fish images
3. View detection results instantly
4. Monitor statistics and charts

---

## ⚠️ Note

Ports changed from default (5000 → 5555, 3000 → 3001) to avoid conflicts with your other projects.

**Enjoy Fishr! 🎣**

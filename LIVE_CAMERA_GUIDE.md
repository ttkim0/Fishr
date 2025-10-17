# 🐟 Fishr - Live Camera Detection System

## 🎥 Real-Time Fish Detection for Fishermen

Fishr is now a **LIVE CAMERA** detection system designed for real-time fish identification at fishing bays, boats, and fishing locations.

---

## ✨ Features

### 📹 **Live Webcam Detection**
- Real-time video processing from your webcam
- 10 FPS continuous detection
- Multiple fish detection simultaneously
- Real-time bounding boxes overlay on video feed

### 🎯 **AI-Powered Classification**
- YOLOv8 segmentation model
- Detects and classifies fish species instantly
- Confidence scoring for each detection
- Automatic weight estimation

### 📊 **Live Dashboard**
- Real-time detection counter
- Instant statistics updates
- Live fish type distribution charts
- Historical tracking of all catches

### 🔴 **WebSocket Communication**
- Real-time bidirectional communication
- Instant detection results
- Low latency streaming
- Connection status monitoring

---

## 🚀 How to Use

### 1. Start the System

Visit: **http://localhost:3001**

### 2. Grant Camera Permission

When prompted, allow browser access to your webcam

### 3. Start Detection

Click **"▶️ Start Detection"** button

### 4. Watch Real-Time Detection

- Green bounding boxes appear around detected fish
- Fish type and confidence shown on each detection
- Weight automatically calculated
- Statistics update in real-time

### 5. Monitor Dashboard

- **Total Catches Today** - Running count
- **Total Weight** - Cumulative weight
- **Fish Species** - Unique types detected
- **Live Chart** - Real-time distribution

---

## 🎮 Controls

| Button | Action |
|--------|--------|
| ▶️ Start Detection | Begin live camera processing |
| ⏸️ Stop Detection | Pause detection (camera stays on) |
| 🔴 LIVE Badge | Shows system is actively detecting |
| FPS Counter | Shows processing speed (target: 10 FPS) |

---

## 📱 MVP vs Production

### Current MVP (Webcam)
- Uses computer/laptop webcam
- Perfect for testing and development
- Demonstrates full capability

### Future Production (Boat Camera)
- Replace webcam with waterproof boat camera
- Same detection algorithm
- Same real-time processing
- Just change video input source

---

## 🔧 Technical Details

### Backend (Python)
- **Port:** 5555
- **Protocol:** WebSocket (Socket.IO)
- **Framework:** Flask + Flask-SocketIO
- **Processing:** 10 frames per second
- **Model:** YOLOv8n-seg (6.7MB)

### Frontend (React)
- **Port:** 3001
- **Library:** react-webcam
- **Communication:** socket.io-client
- **Video:** 1280x720 @ 10 FPS
- **Canvas Overlay:** Real-time bounding boxes

### Data Flow
1. Webcam captures frame (100ms interval)
2. Frame sent to backend via WebSocket
3. YOLOv8 processes frame (~50-100ms)
4. Detections returned to frontend
5. Bounding boxes drawn on canvas
6. High-confidence catches saved to database

---

## 🎯 Use Cases

### For Fishermen
- Identify fish species instantly
- Track daily catch totals
- Monitor weight estimates
- Keep historical records

### For Fishing Bays
- Real-time monitoring system
- Automated catch logging
- Species distribution tracking
- Compliance and reporting

### For Boats
- Identify catches immediately
- Log everything automatically
- No manual data entry
- Export data later

---

## 🔍 Detection Details

### Confidence Threshold
- Display: Shows all detections
- Database: Only saves detections > 50% confidence
- Adjustable in backend code

### Supported Species (Demo)
1. Bass
2. Trout
3. Salmon
4. Catfish
5. Pike
6. Perch
7. Carp
8. Tuna
9. Mackerel
10. Snapper

*Train custom model for specific regional fish*

---

## 📊 Database Schema

```sql
fish_catches (
  id INTEGER PRIMARY KEY,
  fish_type TEXT,
  weight REAL,
  confidence REAL,
  detected_at TIMESTAMP,
  session_id TEXT
)
```

---

## 🎨 UI Features

### Live Video Feed
- Full HD webcam stream
- Smooth bounding box overlays
- Color-coded fish labels
- Weight display on detections

### Real-Time Badges
- 🔴 LIVE indicator (pulsing animation)
- Fish counter (updates instantly)
- Connection status indicator
- FPS performance meter

### Statistics Cards
- Animated number transitions
- Hover effects
- Dark blue ocean theme
- Glass-morphism design

---

## 🚀 Future Enhancements

### Hardware Upgrades
- [ ] Waterproof camera integration
- [ ] Night vision capability
- [ ] Multiple camera angles
- [ ] Raspberry Pi deployment

### Software Features
- [ ] Fish size measurement (length/width)
- [ ] Species-specific regulations check
- [ ] GPS location tagging
- [ ] Weather data integration
- [ ] Mobile app version
- [ ] Offline processing mode

### AI Improvements
- [ ] Custom fish species training
- [ ] Regional species models
- [ ] Catch/release classification
- [ ] Health assessment
- [ ] Age estimation

---

## 💡 Tips for Best Results

1. **Good Lighting**: Ensure fish are well-lit
2. **Clear View**: Keep camera lens clean
3. **Stable Position**: Mount camera securely
4. **Network**: Stable internet for cloud version
5. **Processing**: Close other heavy applications

---

## 🐛 Troubleshooting

### Camera Not Detected
- Check browser permissions
- Try different browser (Chrome recommended)
- Restart browser
- Check system camera settings

### Low FPS
- Close other applications
- Reduce video resolution in code
- Check CPU usage
- Try different browser

### No Detections
- Adjust lighting
- Move fish closer to camera
- Ensure fish are in frame
- Check confidence threshold

### WebSocket Connection Failed
- Verify backend is running (port 5555)
- Check firewall settings
- Restart both servers
- Check browser console for errors

---

## 📞 Access Points

- **Frontend:** http://localhost:3001
- **Backend API:** http://localhost:5555
- **Health Check:** http://localhost:5555/api/health
- **WebSocket:** ws://localhost:5555

---

## 🎉 You're All Set!

Your Fishr live camera detection system is ready to identify fish in real-time!

**Perfect for:**
- Fishing bays monitoring
- Boat installations
- Catch logging systems
- Research and education
- Sport fishing events

---

**Built for real fishermen, by AI enthusiasts! 🎣**

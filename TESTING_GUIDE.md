# 🧪 Testing Guide - Fish Detection System

## Quick Test Steps

### 1. **Refresh Your Browser** (IMPORTANT!)
```
Press Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
```
This clears the old WebSocket connection and establishes a new one with the fixed backend.

### 2. **Verify Backend Connection**
Open Browser Console (F12 or Cmd+Option+I) and look for:
```
✅ Connected to Fishr detection server
✅ 🏓 Received pong from backend
```

If you see this, the WebSocket connection is working!

### 3. **Start Fish Detection**
1. Click on **"📹 Live Camera"** in the navigation
2. Allow camera access when prompted
3. Click **"▶️ Start Detection"** button
4. Point your camera at a fish (photo, video, or real fish)

### 4. **What You Should See**

#### When Detection Works:
- **Blue bounding boxes** around detected fish
- **Fish name** displayed above the box (e.g., "Tuna", "Salmon")
- **Confidence percentage** next to the name (e.g., "85%")
- **Weight estimate** below the box in lbs
- **Detection count** updating at the bottom

#### Example Display:
```
┌────────────────────────┐
│ Tuna (85%)            │ ← Blue label with fish name & confidence
│                        │
│      [FISH IMAGE]      │ ← Your camera feed
│                        │
│ 12.5 lbs              │ ← Weight estimate
└────────────────────────┘
```

## Testing with Different Fish

### Test Images You Can Use:
1. **Google Search**: Search "tuna fish" or "salmon fish" and point camera at screen
2. **Printed Photos**: Print any fish image and show it to the camera
3. **Fish Videos**: Play a fish documentary on another screen
4. **Real Fish**: If you have a fish tank or aquarium nearby!

### Expected Species Detection:
The system can identify **640 different fish species** including:
- Tuna, Salmon, Cod, Bass, Trout
- Goldfish, Koi, Carp
- Shark, Barracuda, Grouper
- And 627 more species!

## Troubleshooting

### Problem: "Socket error: table fish_catches has no column named session_id"
**Status**: ✅ FIXED! Database schema has been updated.
**Action**: Refresh your browser (Cmd+Shift+R)

### Problem: Blue boxes not showing
**Possible Causes**:
1. **No fish in view**: Point camera at a fish image
2. **Low confidence**: System only shows detections >50% confidence
3. **Camera not started**: Click "▶️ Start Detection" button
4. **Browser cache**: Do a hard refresh (Cmd+Shift+R)

### Problem: "Disconnected from server"
**Solution**:
1. Check if backend is running: `http://localhost:5555`
2. Backend should show: `✅ Using Professional Fish Detector with 640 species!`
3. Refresh browser page

### Problem: Detection is slow
**Normal Behavior**: The system processes 10 frames per second (FPS)
- Each frame takes ~100ms to process
- This is intentional to balance accuracy and performance

## Backend Status Check

### How to Verify Backend is Running:

1. **Terminal**: You should see:
```
✅ Using Professional Fish Detector with 640 species!
✅ Loaded 427 fish species
✅ YOLOv12 Fish Detector loaded
🚀 Server running on http://localhost:5555
```

2. **Browser**: Visit `http://localhost:5555/api/health`
Should return: `{"status":"healthy","timestamp":"..."}`

## Database Verification

Check if data is being saved:
```bash
cd /Users/terrykim/fish\ identifyer/backend
sqlite3 fishr.db "SELECT * FROM fish_catches ORDER BY detected_at DESC LIMIT 5;"
```

You should see recent fish detections with:
- fish_type (e.g., "Tuna")
- confidence (e.g., 0.85)
- weight (e.g., 12.5)
- session_id (e.g., "abc123...")
- detected_at (timestamp)

## Performance Monitoring

### In Browser Console:
- **FPS Counter**: Shows in top-right of camera view
- **Frame Logs**: Shows "📤 Sending frame to backend..."
- **Detection Results**: Shows when fish are detected

### Expected Performance:
- **Frame Rate**: 10 FPS
- **Detection Time**: ~100-200ms per frame
- **Confidence Threshold**: >50% for display
- **Database Saves**: Only high-confidence detections (>50%)

## Success Criteria ✅

Your system is working correctly if you see:

1. ✅ Backend running with "640 species" message
2. ✅ Frontend connected (green dot in camera view)
3. ✅ Blue boxes appearing on detected fish
4. ✅ Fish names and percentages displaying correctly
5. ✅ No error messages in browser console
6. ✅ Detection count increasing when fish appear

## Next Steps After Testing

Once everything is working:

1. **Test with Multiple Fish**: Try images with multiple fish in frame
2. **Test Different Angles**: Rotate fish images to test different views
3. **Test Different Species**: Try various fish types to see the 640-species capability
4. **Check Database**: Verify detections are being saved correctly
5. **Performance Test**: Monitor FPS and detection speed

---

**Last Updated**: October 17, 2025, 11:59 PM
**Status**: 🟢 SYSTEM READY FOR TESTING



# 🐟 Fishr - Setup & Usage Guide

Welcome to **Fishr**, your AI-powered fish detection and classification dashboard!

## 🎯 Features

- **AI Fish Detection**: Uses YOLOv8 for accurate fish detection and segmentation
- **Real-time Classification**: Automatically identifies fish species
- **Weight Estimation**: Estimates fish weight based on image analysis
- **Beautiful Dashboard**: Modern, dark blue themed interface with live statistics
- **Data Tracking**: Tracks all catches with timestamps and confidence scores
- **Interactive Charts**: Visualize fish type distribution and statistics

## 📋 Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn
- macOS, Linux, or Windows

## 🚀 Quick Start

### Option 1: Automatic Setup (Recommended)

Run the all-in-one startup script:

```bash
./start-all.sh
```

This will:
1. Set up Python virtual environment
2. Install all backend dependencies
3. Install all frontend dependencies
4. Start both servers in separate terminal windows

### Option 2: Manual Setup

#### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Start the Flask server:
```bash
python app.py
```

The backend will be running at `http://localhost:5000`

#### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will automatically open at `http://localhost:3000`

## 📱 Using Fishr

1. **Upload Fish Images**: 
   - Drag and drop fish images onto the upload zone
   - Or click to select images from your computer
   - Supports JPG, PNG, and JPEG formats

2. **View Detection Results**:
   - Instantly see detected fish with species, weight, and confidence
   - All detections are automatically saved to the database

3. **Monitor Statistics**:
   - **Total Catches Today**: See how many fish were detected today
   - **Total Weight**: View the cumulative weight of all catches
   - **Fish Species**: Track the number of different species identified

4. **Analyze Data**:
   - View fish type distribution in the interactive bar chart
   - Browse recent catches with timestamps and details
   - Data updates automatically every 30 seconds

## 🎨 Design Philosophy

Fishr features a **premium dark blue theme** with:
- Deep ocean-inspired color palette (#0a1929 to #3b82f6)
- Smooth gradients and glass-morphism effects
- High contrast for excellent readability
- Responsive design that works on all devices
- Modern, clean interface with subtle animations

## 🧠 AI Model Information

- **Detection Model**: YOLOv8n-seg (Nano Segmentation)
- **Confidence Threshold**: 25%
- **Supported Features**: Object detection, segmentation, classification
- **Weight Estimation**: Based on bounding box analysis (can be calibrated)

## 📊 API Endpoints

- `GET /api/health` - Health check
- `POST /api/detect` - Upload and detect fish in image
- `GET /api/stats/today` - Get today's statistics
- `GET /api/catches?limit=N&offset=M` - Get fish catches with pagination
- `GET /api/fish-types` - Get fish type distribution

## 🔧 Customization

### Adding Custom Fish Species

Edit `backend/fish_detector.py` and modify the `fish_types` dictionary:

```python
self.fish_types = {
    0: 'Your Custom Fish',
    1: 'Another Species',
    # Add more species...
}
```

### Training Your Own Classifier

To use a custom trained model:

1. Train your fish classification model
2. Save the model weights
3. Update the `FishDetector` class to load your model
4. Modify the `classify_fish()` method to use your classifier

### Adjusting Weight Estimation

Calibrate the weight estimation in `fish_detector.py`:

```python
def estimate_weight(self, bbox, image_width, image_height):
    # Customize the formula based on your data
    estimated_weight = normalized_area * YOUR_MULTIPLIER
    return round(estimated_weight, 2)
```

## 🐛 Troubleshooting

### Backend Issues

- **Port 5000 in use**: Change the port in `backend/app.py`
- **Model download fails**: Check internet connection, YOLOv8 will download on first run
- **Import errors**: Make sure virtual environment is activated

### Frontend Issues

- **Port 3000 in use**: React will prompt to use another port
- **API connection fails**: Ensure backend is running on port 5000
- **npm install errors**: Try deleting `node_modules` and `package-lock.json`, then reinstall

### Database Issues

- Database is automatically created in `backend/fishr.db`
- To reset database: Delete `fishr.db` and restart the backend

## 📈 Future Enhancements

Potential improvements for your Fishr application:

- [ ] User authentication and multi-user support
- [ ] Export data to CSV/Excel
- [ ] Advanced filtering and search
- [ ] Mobile app version
- [ ] Real-time video stream detection
- [ ] Integration with fishing log apps
- [ ] Weather and location tracking
- [ ] Social sharing features

## 🤝 Contributing

Feel free to customize and extend Fishr for your needs!

## 📄 License

MIT License - Feel free to use and modify

---

**Enjoy using Fishr! 🐟**

For questions or issues, check the troubleshooting section above.

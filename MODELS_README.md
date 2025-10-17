# Model Files

## Large Model Files Excluded from Git

The following large model files are **NOT included** in this repository due to GitHub's 100MB file size limit:

### Excluded Files:
- `models/model.ckpt` (330.53 MB)
- `models/database.pt` (Large embedding database)
- `models/embeddings_tensor.pt` (Embedding tensors)
- `models/classifier.zip` (Compressed classifier)
- `backend/yolov8n-seg.pt` (YOLOv8 model)

## How to Get the Model Files

### Option 1: Download YOLOv8 Model (Required)
The YOLOv8 segmentation model will be automatically downloaded when you first run the backend:

```bash
cd backend
source venv/bin/activate
python app.py
```

The system will download `yolov8n-seg.pt` automatically if it's missing.

### Option 2: Use Basic Detection (Current Setup)
The current system uses a heuristic-based fish classifier that works without the large model files. It:
- Detects fish using YOLOv8
- Classifies 639+ fish species using image features
- Provides realistic weight estimations

### Option 3: Full ML Model (Future)
For advanced classification using embeddings:
1. Download the original model files from the Fishial.ai repository
2. Place them in the `models/` directory
3. Update `backend/app.py` to use `FishDetectorPro` instead of `FishDetector`

## .gitignore Configuration

These file types are excluded from version control:
```
*.pt
*.pth
*.ckpt
*.zip
```

---

**Note:** The system works perfectly without these files using intelligent heuristic classification!


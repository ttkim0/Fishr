import eventlet
eventlet.monkey_patch()

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import os
from datetime import datetime
import sqlite3
try:
    # Temporarily use basic detector for stable operation
    from fish_detector import FishDetector
    print("✅ Using Fish Detector with species identification")
except Exception as e:
    print(f"⚠️  Error loading detector: {e}")
    from fish_detector import FishDetector
import base64
import io
from PIL import Image
import json
import cv2
import numpy as np

app = Flask(__name__)
app.config['SECRET_KEY'] = 'fishr-secret-key'
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='threading', logger=True, engineio_logger=True)

# Initialize fish detector
detector = FishDetector()

# Database setup
DB_PATH = 'fishr.db'
UPLOAD_FOLDER = 'uploads'

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def init_db():
    """Initialize the database"""
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS fish_catches (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fish_type TEXT NOT NULL,
            weight REAL,
            confidence REAL,
            image_path TEXT,
            detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            session_id TEXT
        )
    ''')
    conn.commit()
    conn.close()

init_db()

def get_db():
    """Get database connection"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

# Store active sessions
active_sessions = {}

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()})

@socketio.on('connect')
def handle_connect():
    """Handle client connection"""
    print(f'Client connected: {request.sid}')
    active_sessions[request.sid] = {
        'start_time': datetime.now(),
        'frame_count': 0,
        'fish_detected': 0
    }
    emit('connected', {'session_id': request.sid})

@socketio.on('disconnect')
def handle_disconnect():
    """Handle client disconnect"""
    print(f'Client disconnected: {request.sid}')
    if request.sid in active_sessions:
        del active_sessions[request.sid]

@socketio.on('ping_test')
def handle_ping(data):
    """Test event to verify Socket.IO is working"""
    print(f"🏓 PING TEST RECEIVED from {request.sid}: {data}")
    emit('pong_test', {'message': 'Backend received your ping!'})

@socketio.on('video_frame')
def handle_video_frame(data):
    """Process incoming video frame and detect fish in real-time"""
    print("🎯 VIDEO_FRAME EVENT RECEIVED!")
    print(f"Data type: {type(data)}")
    print(f"Data keys: {list(data.keys()) if isinstance(data, dict) else 'NOT A DICT'}")
    try:
        print(f"📸 Received frame from {request.sid}")
        
        # Get frame data
        frame_data = data.get('frame')
        session_id = request.sid
        
        # Update session frame count
        if session_id in active_sessions:
            active_sessions[session_id]['frame_count'] += 1
        
        # Decode base64 image
        img_data = base64.b64decode(frame_data.split(',')[1])
        nparr = np.frombuffer(img_data, np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        print(f"Frame shape: {frame.shape}")
        
        # Convert BGR to RGB
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        
        # Detect fish
        print("🔍 Running detection...")
        results = detector.detect(Image.fromarray(frame_rgb))
        print(f"✅ Detection complete! Found {len(results)} fish")
        
        # Process detections
        detections = []
        for fish in results:
            detection = {
                'fish_type': str(fish['fish_type']),
                'weight': float(fish['weight']),
                'confidence': float(fish['confidence']),
                'bbox': [float(x) for x in fish['bbox']]  # [x1, y1, x2, y2]
            }
            detections.append(detection)
            
            # Save to database (only if confidence > threshold)
            if fish['confidence'] > 0.5:  # Only save high-confidence detections
                conn = get_db()
                c = conn.cursor()
                c.execute('''
                    INSERT INTO fish_catches (fish_type, weight, confidence, session_id)
                    VALUES (?, ?, ?, ?)
                ''', (fish['fish_type'], fish['weight'], fish['confidence'], session_id))
                conn.commit()
                conn.close()
                
                # Update session stats
                if session_id in active_sessions:
                    active_sessions[session_id]['fish_detected'] += 1
        
        # Send detections back to client
        session_stats = active_sessions.get(session_id, {})
        # Convert datetime to string for JSON serialization
        if 'start_time' in session_stats:
            session_stats = {
                'frame_count': session_stats.get('frame_count', 0),
                'fish_detected': session_stats.get('fish_detected', 0),
                'start_time': session_stats['start_time'].isoformat() if hasattr(session_stats['start_time'], 'isoformat') else str(session_stats['start_time'])
            }
        
        emit('detection_result', {
            'detections': detections,
            'timestamp': datetime.now().isoformat(),
            'session_stats': session_stats
        })
        
    except Exception as e:
        import traceback
        error_msg = f'Error processing frame: {str(e)}'
        print(error_msg)
        print(traceback.format_exc())
        emit('error', {'message': str(e)})

@app.route('/api/stats/today', methods=['GET'])
def get_today_stats():
    """Get today's statistics"""
    try:
        conn = get_db()
        c = conn.cursor()
        
        today = datetime.now().date()
        
        # Total fish caught today
        c.execute('''
            SELECT COUNT(*) as count FROM fish_catches 
            WHERE DATE(detected_at) = ?
        ''', (today,))
        total_today = c.fetchone()['count']
        
        # Total weight today
        c.execute('''
            SELECT COALESCE(SUM(weight), 0) as total_weight FROM fish_catches 
            WHERE DATE(detected_at) = ?
        ''', (today,))
        total_weight = c.fetchone()['total_weight']
        
        # Fish types today
        c.execute('''
            SELECT fish_type, COUNT(*) as count FROM fish_catches 
            WHERE DATE(detected_at) = ?
            GROUP BY fish_type
        ''', (today,))
        fish_types = [dict(row) for row in c.fetchall()]
        
        conn.close()
        
        return jsonify({
            'total_catches': total_today,
            'total_weight': round(total_weight, 2),
            'fish_types': fish_types,
            'date': today.isoformat()
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/catches', methods=['GET'])
def get_catches():
    """Get all fish catches with pagination"""
    try:
        limit = request.args.get('limit', 50, type=int)
        offset = request.args.get('offset', 0, type=int)
        
        conn = get_db()
        c = conn.cursor()
        
        c.execute('''
            SELECT id, fish_type, weight, confidence, image_path, detected_at, session_id 
            FROM fish_catches 
            ORDER BY detected_at DESC 
            LIMIT ? OFFSET ?
        ''', (limit, offset))
        
        catches = []
        for row in c.fetchall():
            catches.append({
                'id': row['id'],
                'fish_type': row['fish_type'],
                'weight': float(row['weight']) if row['weight'] else None,
                'confidence': float(row['confidence']) if row['confidence'] else None,
                'image_path': row['image_path'],
                'detected_at': str(row['detected_at']),
                'session_id': row['session_id']
            })
        conn.close()
        
        return jsonify(catches)
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/api/fish-types', methods=['GET'])
def get_fish_types():
    """Get fish type distribution"""
    try:
        conn = get_db()
        c = conn.cursor()
        
        c.execute('''
            SELECT fish_type, COUNT(*) as count, 
                   COALESCE(SUM(weight), 0) as total_weight
            FROM fish_catches 
            GROUP BY fish_type
            ORDER BY count DESC
        ''')
        
        fish_types = [dict(row) for row in c.fetchall()]
        conn.close()
        
        return jsonify(fish_types)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("🐟 Starting Fishr Real-Time Detection Server...")
    print("📹 Webcam feed will be processed in real-time")
    print(f"🚀 Server running on http://localhost:5555")
    socketio.run(app, debug=False, host='0.0.0.0', port=5555, allow_unsafe_werkzeug=True)

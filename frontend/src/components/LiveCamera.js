import React, { useRef, useEffect, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { io } from 'socket.io-client';
import './LiveCamera.css';

const BACKEND_URL = 'http://localhost:5555';

function LiveCamera({ onDetection }) {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [detections, setDetections] = useState([]);
  const [fps, setFps] = useState(0);
  const frameIntervalRef = useRef(null);
  const fpsIntervalRef = useRef(null);
  const frameCountRef = useRef(0);

  // Initialize Socket.IO connection
  useEffect(() => {
    const newSocket = io(BACKEND_URL, {
      transports: ['polling', 'websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 10,
      timeout: 20000
    });

    newSocket.on('connect', () => {
      console.log('Connected to Fishr detection server');
      setIsConnected(true);
      // Send test ping
      newSocket.emit('ping_test', { test: 'Hello from frontend!' });
      console.log('🏓 Sent ping test to backend');
    });
    
    newSocket.on('pong_test', (data) => {
      console.log('🏓 Received pong from backend:', data);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
      setIsStreaming(false);
    });

    newSocket.on('detection_result', (data) => {
      setDetections(data.detections || []);
      if (onDetection && data.detections.length > 0) {
        onDetection(data);
      }
      frameCountRef.current++;
    });

    newSocket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    setSocket(newSocket);

    return () => {
      if (frameIntervalRef.current) {
        clearInterval(frameIntervalRef.current);
      }
      if (fpsIntervalRef.current) {
        clearInterval(fpsIntervalRef.current);
      }
      newSocket.close();
    };
  }, [onDetection]);

  // Calculate FPS
  useEffect(() => {
    if (isStreaming) {
      fpsIntervalRef.current = setInterval(() => {
        setFps(frameCountRef.current);
        frameCountRef.current = 0;
      }, 1000);
    }
    return () => {
      if (fpsIntervalRef.current) {
        clearInterval(fpsIntervalRef.current);
      }
    };
  }, [isStreaming]);

  // Capture and send frames
  const captureFrame = useCallback(() => {
    console.log('Attempting to capture frame...', {
      hasWebcam: !!webcamRef.current,
      hasSocket: !!socket,
      isConnected: isConnected
    });
    
    if (webcamRef.current && socket && isConnected) {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log('Screenshot captured:', imageSrc ? 'YES' : 'NO');
      if (imageSrc) {
        console.log('📤 Sending frame to backend...');
        socket.emit('video_frame', { frame: imageSrc });
      }
    } else {
      console.log('❌ Cannot capture: missing webcam/socket/connection');
    }
  }, [socket, isConnected]);

  // Start/Stop streaming
  const toggleStreaming = () => {
    console.log('🔘 BUTTON CLICKED! toggleStreaming called. Current isStreaming:', isStreaming);
    if (isStreaming) {
      console.log('⏸️ Stopping detection...');
      // Stop streaming
      if (frameIntervalRef.current) {
        clearInterval(frameIntervalRef.current);
        frameIntervalRef.current = null;
      }
      setIsStreaming(false);
      setDetections([]);
    } else {
      // Start streaming - send 10 frames per second
      console.log('▶️ Starting detection... Setting interval to capture frames every 100ms');
      frameIntervalRef.current = setInterval(captureFrame, 100);
      setIsStreaming(true);
      console.log('✅ Interval set! Interval ID:', frameIntervalRef.current);
    }
  };

  // Draw bounding boxes on canvas
  useEffect(() => {
    if (canvasRef.current && webcamRef.current) {
      const canvas = canvasRef.current;
      const video = webcamRef.current.video;
      
      if (video) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw bounding boxes for each detection
        detections.forEach((detection) => {
          const [x1, y1, x2, y2] = detection.bbox;
          const width = x2 - x1;
          const height = y2 - y1;
          
          // Draw box
          ctx.strokeStyle = '#3b82f6';
          ctx.lineWidth = 3;
          ctx.strokeRect(x1, y1, width, height);
          
          // Draw label background
          ctx.fillStyle = 'rgba(59, 130, 246, 0.9)';
          const labelText = `${detection.fish_type} (${(detection.confidence * 100).toFixed(0)}%)`;
          const textMetrics = ctx.measureText(labelText);
          const labelHeight = 25;
          ctx.fillRect(x1, y1 - labelHeight, textMetrics.width + 20, labelHeight);
          
          // Draw label text
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 14px Inter';
          ctx.fillText(labelText, x1 + 10, y1 - 8);
          
          // Draw weight
          ctx.fillStyle = 'rgba(59, 130, 246, 0.9)';
          const weightText = `${detection.weight} lbs`;
          ctx.fillRect(x1, y2, 100, 20);
          ctx.fillStyle = '#ffffff';
          ctx.font = '12px Inter';
          ctx.fillText(weightText, x1 + 10, y2 + 14);
        });
      }
    }
  }, [detections]);

  return (
    <div className="live-camera-container">
      <div className="camera-header">
        <h2>📹 Live Fish Detection</h2>
        <div className="camera-status">
          <span className={`status-dot ${isConnected ? 'connected' : 'disconnected'}`}></span>
          <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
          <span className="fps-counter">FPS: {fps}</span>
        </div>
      </div>

      <div className="camera-view">
        <div className="video-container">
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              width: 1280,
              height: 720,
              facingMode: 'user'
            }}
            className="webcam"
          />
          <canvas ref={canvasRef} className="detection-canvas" />
        </div>

        <button 
          onClick={toggleStreaming} 
          disabled={!isConnected}
          className={`stream-button ${isStreaming ? 'streaming' : ''}`}
        >
          {isStreaming ? '⏸️ Stop Detection' : '▶️ Start Detection'}
        </button>
      </div>

      {detections.length > 0 && (
        <div className="live-detections">
          <h3>🐟 Active Detections: {detections.length}</h3>
          <div className="detection-list">
            {detections.map((det, idx) => (
              <div key={idx} className="detection-item">
                <span className="fish-icon">🐠</span>
                <span className="fish-name">{det.fish_type}</span>
                <span className="fish-weight">{det.weight} lbs</span>
                <span className="fish-conf">{(det.confidence * 100).toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default LiveCamera;

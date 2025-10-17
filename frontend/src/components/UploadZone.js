import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import './UploadZone.css';

const API_BASE = 'http://localhost:5555/api';

function UploadZone({ onSuccess }) {
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);
    setResult(null);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(`${API_BASE}/detect`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setResult(response.data);
      setUploading(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Upload error:', error);
      setUploading(false);
      setResult({ error: 'Failed to detect fish. Please try again.' });
    }
  }, [onSuccess]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false
  });

  return (
    <div className="card upload-zone">
      <h2>📸 Upload Fish Image</h2>
      
      <div 
        {...getRootProps()} 
        className={`dropzone ${isDragActive ? 'active' : ''} ${uploading ? 'uploading' : ''}`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div className="upload-status">
            <div className="spinner"></div>
            <p>Detecting fish...</p>
          </div>
        ) : (
          <div className="upload-prompt">
            <p className="upload-icon">🎣</p>
            <p className="upload-text">
              {isDragActive ? 'Drop your fish image here!' : 'Drag & drop a fish image, or click to select'}
            </p>
            <p className="upload-hint">Supports JPG, PNG, JPEG</p>
          </div>
        )}
      </div>

      {result && !result.error && (
        <div className="detection-result">
          <h3>🎉 Detection Complete!</h3>
          <p className="result-summary">
            Found <strong>{result.fish_detected}</strong> fish!
          </p>
          <div className="detected-fish-list">
            {result.fish.map((fish, index) => (
              <div key={index} className="detected-fish-item">
                <span className="fish-emoji">🐟</span>
                <span className="fish-name">{fish.fish_type}</span>
                <span className="fish-details">
                  {fish.weight} lbs • {(fish.confidence * 100).toFixed(1)}% confidence
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {result && result.error && (
        <div className="error-message">
          <p>❌ {result.error}</p>
        </div>
      )}
    </div>
  );
}

export default UploadZone;

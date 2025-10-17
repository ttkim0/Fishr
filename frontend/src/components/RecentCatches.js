import React from 'react';
import './RecentCatches.css';

function RecentCatches({ catches, onRefresh }) {
  if (!catches || catches.length === 0) {
    return (
      <div className="card recent-catches-card">
        <div className="catches-header">
          <h2>🕐 Recent Catches</h2>
          {onRefresh && (
            <button className="refresh-button" onClick={onRefresh} title="Refresh">
              ↻
            </button>
          )}
        </div>
        <div className="no-catches">
          <p>🎣 Detected fish will appear here automatically!</p>
          <p style={{fontSize: '0.9rem', opacity: 0.7, marginTop: '10px'}}>
            High-confidence detections are saved to history
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="card recent-catches-card">
      <div className="catches-header">
        <h2>🕐 Recent Catches</h2>
        {onRefresh && (
          <button className="refresh-button" onClick={onRefresh} title="Refresh">
            ↻
          </button>
        )}
      </div>
      <div className="catches-list">
        {catches.map((fish) => (
          <div key={fish.id} className="catch-item">
            <div className="catch-icon">🐟</div>
            <div className="catch-details">
              <div className="catch-type">{fish.fish_type}</div>
              <div className="catch-meta">
                {fish.weight ? `${fish.weight} lbs` : 'N/A'} • 
                {fish.confidence ? ` ${(fish.confidence * 100).toFixed(0)}% confidence` : ''} • 
                {formatDate(fish.detected_at)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentCatches;

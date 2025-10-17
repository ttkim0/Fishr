import React from 'react';
import './StatsCard.css';

function StatsCard({ title, value, icon }) {
  return (
    <div className="card stats-card">
      <div className="stats-icon">{icon}</div>
      <div className="stats-content">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{title}</div>
      </div>
    </div>
  );
}

export default StatsCard;

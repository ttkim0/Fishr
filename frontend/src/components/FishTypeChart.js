import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import './FishTypeChart.css';

const COLORS = ['#3b82f6', '#60a5fa', '#2563eb', '#1e40af', '#1e3a8a'];

function FishTypeChart({ fishTypes }) {
  if (!fishTypes || fishTypes.length === 0) {
    return (
      <div className="card chart-card">
        <h2>📊 Fish Types Distribution</h2>
        <div className="no-data">
          <p>🎥 Start live detection to see fish distribution!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card chart-card">
      <h2>📊 Fish Types Distribution</h2>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={fishTypes} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.2)" />
            <XAxis 
              dataKey="fish_type" 
              stroke="#93c5fd"
              style={{ fontSize: '0.9rem' }}
            />
            <YAxis 
              stroke="#93c5fd"
              style={{ fontSize: '0.9rem' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(10, 25, 41, 0.95)', 
                border: '1px solid rgba(59, 130, 246, 0.5)',
                borderRadius: '8px',
                color: '#93c5fd'
              }}
              cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
            />
            <Bar dataKey="count" radius={[8, 8, 0, 0]}>
              {fishTypes.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default FishTypeChart;

import React, { useState, useEffect } from 'react';
import './App.css';
import Landing from './pages/Landing';
import LiveCamera from './components/LiveCamera';
import StatsCard from './components/StatsCard';
import FishTypeChart from './components/FishTypeChart';
import RecentCatches from './components/RecentCatches';
import axios from 'axios';

const API_BASE = 'http://localhost:5555/api';

function App() {
  const [user, setUser] = useState(null); // null = show landing, object = logged in
  const [todayStats, setTodayStats] = useState({
    total_catches: 0,
    total_weight: 0,
    fish_types: []
  });
  const [recentCatches, setRecentCatches] = useState([]);
  const [liveDetections, setLiveDetections] = useState(0);

  useEffect(() => {
    if (user) {
      fetchData();
      // Refresh data every 5 seconds when logged in
      const interval = setInterval(fetchData, 5000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const [statsRes, catchesRes] = await Promise.all([
        axios.get(`${API_BASE}/stats/today`),
        axios.get(`${API_BASE}/catches?limit=10`)
      ]);
      
      setTodayStats(statsRes.data);
      setRecentCatches(catchesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDetection = (data) => {
    // Update live detections count
    if (data.detections) {
      setLiveDetections(data.detections.length);
      
      // Refresh stats immediately when high-confidence fish are detected
      const highConfidenceDetections = data.detections.filter(d => d.confidence > 0.5);
      if (highConfidenceDetections.length > 0) {
        // Refresh after a short delay to allow backend to save
        setTimeout(fetchData, 500);
      }
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  // Show landing page if not logged in
  if (!user) {
    return <Landing onLogin={handleLogin} />;
  }

  // Show dashboard if logged in
  return (
    <div className="App">
      <nav className="app-nav">
        <div className="nav-brand">
          <h1>🐟 Fishr</h1>
          <span className="nav-subtitle">AI Fish Detection System</span>
        </div>
        <div className="nav-user">
          <span className="user-name">👤 {user.name}</span>
          <button className="nav-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="header-content">
            <h2>Live Detection Dashboard</h2>
            <div className="header-badge">
              <span className="badge-live">🔴 LIVE</span>
              <span className="badge-detections">
                {liveDetections} fish currently detected
              </span>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <LiveCamera onDetection={handleDetection} />
          
          <StatsCard
            title="Total Catches Today"
            value={todayStats.total_catches}
            icon="🎣"
          />
          
          <StatsCard
            title="Total Weight Today"
            value={`${todayStats.total_weight} lbs`}
            icon="⚖️"
          />
          
          <StatsCard
            title="Fish Species"
            value={todayStats.fish_types.length}
            icon="🐠"
          />

          <FishTypeChart fishTypes={todayStats.fish_types} />
          
          <RecentCatches catches={recentCatches} onRefresh={fetchData} />
        </div>
      </div>
    </div>
  );
}

export default App;

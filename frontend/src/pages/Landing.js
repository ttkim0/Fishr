import React, { useState } from 'react';
import './Landing.css';

// Import your actual product images
import fishermenImage from '../assets/fishermen-dock.PNG';
import fishermenImage2 from '../assets/fishermen-dock2.png';
import productBoxImage from '../assets/package3.png';

function Landing({ onLogin }) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    // Mock authentication - accepts any email/password
    const mockUser = {
      email: e.target.email.value,
      name: isSignUp ? e.target.name?.value : 'User',
      id: Date.now()
    };
    localStorage.setItem('fishr_auth_token', 'fishr_demo_token_' + Date.now());
    onLogin && onLogin(mockUser); // This will trigger the dashboard to show
    setShowAuthModal(false);
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src="https://storage.coverr.co/videos/LqmzUqSMWMqMu01JpzG02h5Ae3v201V3MJ/preview?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6Ijg3NjdFMzIzRjlGQzEzN0E4QTAyIiwiaWF0IjoxNjUyMTk5NjUzfQ.oOrKZn8gNxVYP4z-B3gCfJRVXt1FLKZ8by9fzX-H5fA" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">🐟 Fishr</span>
            <span className="subtitle">AI Fish Detection & Analytics</span>
          </h1>
          <p className="hero-description">
            Revolutionize your fishery with real-time AI-powered fish detection, classification, and analytics. 
            Smarter catches, better data, sustainable operations.
          </p>
          <div className="hero-cta">
            <button className="cta-primary" onClick={() => setShowAuthModal(true)}>
              Start Free Trial
            </button>
            <button className="cta-secondary">
              Watch Demo
            </button>
          </div>
        </div>
        <div className="scroll-indicator">
          Explore Our Platform
          <div className="scroll-arrow">↓</div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <h2 className="section-title">Empowering Sustainable Fisheries</h2>
          <div className="mission-content">
            <div className="mission-text">
              <h3>Our Mission</h3>
              <p>
                At Fishr, we're revolutionizing the fishing and aquaculture industry with cutting-edge AI technology. 
                Our mission is to empower fishery operations with real-time, accurate data that drives better decisions 
                and promotes sustainability.
              </p>
              <p>
                We believe that technology should work seamlessly in the background, giving you powerful insights 
                without disrupting your workflow. From small-scale operations to large commercial fisheries, 
                Fishr adapts to your needs.
              </p>
              <p>
                Join hundreds of operations worldwide that are already using Fishr to optimize their catch, 
                reduce waste, and contribute to healthier ocean ecosystems.
              </p>
            </div>
            <div className="mission-image">
              <img src={fishermenImage} alt="Fisherman using Fishr technology at dock" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Fishr?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">🎯</span>
              <h3>Real-Time Detection</h3>
              <p>
                Instantly identify and count fish species as they're caught. Our AI processes video feeds 
                in real-time, giving you immediate insights into your catch composition.
              </p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">📊</span>
              <h3>Advanced Analytics</h3>
              <p>
                Track trends, analyze patterns, and make data-driven decisions. Comprehensive dashboards 
                show catch rates, species distribution, and biomass estimates at a glance.
              </p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">⚖️</span>
              <h3>Smart Weight Estimation</h3>
              <p>
                Automatically estimate fish weight using computer vision. Reduce manual weighing time 
                and get accurate inventory data instantly.
              </p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🔒</span>
              <h3>Enterprise Security</h3>
              <p>
                Your data is encrypted and stored with bank-level security. Full compliance with data 
                protection regulations and industry standards.
              </p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🌐</span>
              <h3>Cloud Dashboard</h3>
              <p>
                Access your fishery's performance data from anywhere, on any device. Real-time sync 
                ensures you're always up to date.
              </p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">⚙️</span>
              <h3>Easy Integration</h3>
              <p>
                Plug-and-play setup with existing camera systems, or use our custom hardware. 
                Get up and running in minutes, not days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* See It In Action Section */}
      <section className="action-section">
        <div className="container">
          <h2 className="section-title">See Fishr In Action</h2>
          <div className="action-image">
            <img src={fishermenImage2} alt="Fishr AI system in real fishing operation" />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <h2 className="section-title">Get Started in 3 Simple Steps</h2>
          <div className="steps-grid">
            {/* Step 1 */}
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Receive Your Fishr Package</h3>
              <p>
                Your Fishr package arrives ready to deploy. Inside, you'll find our high-resolution 
                AI camera, mounting hardware, and a unique QR code for instant software access.
              </p>
              <div className="tip">
                <strong>What's Included:</strong> Premium AI camera with weatherproof housing, 
                mounting brackets, power adapter, quick-start guide, and QR code for software download.
              </div>
            </div>

            {/* Step 2 */}
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Position Your Camera Strategically</h3>
              <p>
                Place your Fishr camera in optimal locations throughout your facility for maximum 
                data capture and insight generation.
              </p>
              <ul className="placement-list">
                <li>📍 <strong>Sorting Tables:</strong> Real-time species ID and count</li>
                <li>📍 <strong>Landing Points:</strong> Track incoming catches and biomass</li>
                <li>📍 <strong>Processing Areas:</strong> Quality control and inventory</li>
                <li>📍 <strong>Holding Tanks:</strong> Monitor health and population density</li>
              </ul>
              <div className="tip">
                <strong>Pro Tip:</strong> Mount the camera 6-8 feet above the capture point at a 
                45-degree angle for optimal fish detection and classification accuracy.
              </div>
            </div>

            {/* Step 3 */}
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Scan QR & Launch Your Dashboard</h3>
              <p>
                Simply scan the QR code with your smartphone or tablet to download the Fishr software. 
                The system automatically connects to your camera and begins providing real-time insights.
              </p>
              <div className="qr-demo">
                <span className="qr-placeholder" role="img" aria-label="QR Code">🔲</span>
                <span className="arrow">→</span>
                <span className="software-icon" role="img" aria-label="Software">💻</span>
              </div>
              <div className="tip">
                <strong>Instant Setup:</strong> No technical expertise required. The software 
                auto-configures based on your camera model and location settings.
              </div>
            </div>
          </div>

          {/* Step 4 - Product Box */}
          <div className="product-box-section">
            <div className="product-box-content">
              <div className="product-box-image">
                <img src={productBoxImage} alt="Fishr complete package with camera and QR code" />
              </div>
              <div className="product-box-text">
                <h3>Everything You Need in One Box</h3>
                <p>
                  The Fishr package is designed for quick deployment and immediate results. 
                  From unboxing to your first detection takes less than 30 minutes.
                </p>
                <ul className="product-features">
                  <li>✅ Industrial-grade AI camera with night vision</li>
                  <li>✅ Weatherproof housing (IP67 rated)</li>
                  <li>✅ Universal mounting system</li>
                  <li>✅ Cloud software license (1-year included)</li>
                  <li>✅ 24/7 technical support</li>
                  <li>✅ Regular AI model updates</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <div className="container">
          <h2 className="section-title">Flexible Pricing for Every Scale</h2>
          <p className="pricing-subtitle">Choose the plan that fits your operation</p>
          <div className="pricing-grid">
            {/* Starter */}
            <div className="pricing-card">
              <span className="pricing-badge">Starter</span>
              <h3>For Small Operations</h3>
              <div className="price">
                <span className="amount">$499</span>
                <span className="period">/month</span>
              </div>
              <ul className="features-list">
                <li>✅ 1 AI Camera Included</li>
                <li>✅ Real-time Fish Detection</li>
                <li>✅ Basic Analytics Dashboard</li>
                <li>✅ Email Support (24hr response)</li>
                <li>✅ Mobile App Access</li>
                <li>❌ Multi-camera Support</li>
                <li>❌ Advanced Reporting</li>
                <li>❌ API Access</li>
              </ul>
              <button className="pricing-cta" onClick={() => setShowAuthModal(true)}>
                Start Free Trial
              </button>
            </div>

            {/* Professional - Featured */}
            <div className="pricing-card featured">
              <span className="pricing-badge popular">Most Popular</span>
              <h3>Professional</h3>
              <div className="price">
                <span className="amount">$1,299</span>
                <span className="period">/month</span>
              </div>
              <ul className="features-list">
                <li>✅ 3 AI Cameras Included</li>
                <li>✅ Advanced Analytics & Reporting</li>
                <li>✅ Multi-camera Dashboard</li>
                <li>✅ Priority Support (2hr response)</li>
                <li>✅ Custom Species Training</li>
                <li>✅ API Access & Integrations</li>
                <li>✅ Historical Data (2 years)</li>
                <li>✅ Weekly Performance Reports</li>
              </ul>
              <button className="pricing-cta primary" onClick={() => setShowAuthModal(true)}>
                Start Free Trial
              </button>
            </div>

            {/* Enterprise */}
            <div className="pricing-card">
              <span className="pricing-badge">Enterprise</span>
              <h3>For Large Facilities</h3>
              <div className="price">
                <span className="amount">Custom</span>
              </div>
              <ul className="features-list">
                <li>✅ Unlimited AI Cameras</li>
                <li>✅ Custom AI Model Training</li>
                <li>✅ Dedicated Account Manager</li>
                <li>✅ 24/7 Phone & Chat Support</li>
                <li>✅ On-site Installation & Training</li>
                <li>✅ Custom Integrations (ERP, etc.)</li>
                <li>✅ Unlimited Historical Data</li>
                <li>✅ SLA Guarantees</li>
              </ul>
              <button className="pricing-cta">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Transform Your Fishery?</h2>
          <p>Join leading operations worldwide using Fishr AI</p>
          <button className="cta-large" onClick={() => setShowAuthModal(true)}>
            Start Your Free 14-Day Trial
          </button>
          <p className="cta-note">No credit card required • Cancel anytime • Setup in 30 minutes</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h4>🐟 Fishr AI</h4>
              <p>
                Revolutionizing fishery operations with artificial intelligence. 
                Smarter catches, better data, sustainable futures.
              </p>
            </div>
            <div className="footer-col">
              <h4>Product</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#integrations">Integrations</a></li>
                <li><a href="#demo">Request Demo</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Support</h4>
              <ul>
                <li><a href="#docs">Documentation</a></li>
                <li><a href="#help">Help Center</a></li>
                <li><a href="#status">System Status</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Fishr AI Technologies. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="auth-modal-overlay" onClick={() => setShowAuthModal(false)}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAuthModal(false)}>
              ×
            </button>
            <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
            <form onSubmit={handleAuthSubmit}>
              {isSignUp && (
                <input type="text" name="name" placeholder="Full Name" required />
              )}
              <input type="email" name="email" placeholder="Email Address" required />
              <input type="password" name="password" placeholder="Password" required />
              {isSignUp && (
                <>
                  <input type="text" name="company" placeholder="Company Name" />
                  <input type="tel" name="phone" placeholder="Phone Number" />
                </>
              )}
              <button type="submit" className="auth-submit">
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </button>
            </form>
            <div className="auth-switch">
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              <button onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Landing;

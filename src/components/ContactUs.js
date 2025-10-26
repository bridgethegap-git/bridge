import React, { useState, useEffect } from 'react';
import '../styles/ContactUs.css';

const pic = `${process.env.PUBLIC_URL}/contact.png`


function ContactUs() {
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const fetchSocialLinks = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://bridge-server-zb9l.onrender.com/social');
      
      if (!response.ok) {
        throw new Error('Failed to fetch social links');
      }
      
      const data = await response.json();
      const linksArray = data.socialLinks || data || [];
      setSocialLinks(linksArray);
      setLoading(false);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-hero"
       style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.59), rgba(0, 0, 0, 0.68)), url(${pic})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}>
        <h1>Get In Touch</h1>
        <p className="contact-subtitle">We'd love to hear from you and answer any questions you may have</p>
      </div>

      <div className="contact-content">
        <div className="contact-info-section">
          <h2>Contact Information</h2>
          
          <div className="contact-cards">
            <div className="contact-card">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div className="contact-details">
                <h3>Email</h3>
                <a href="mailto:info@bridgeinthegap.org" className="contact-link">
                  info@bridgeinthegap.org
                </a>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </div>
              <div className="contact-details">
                <h3>Phone</h3>
                <a href="tel:+19805500454" className="contact-link">
                  (980) 550-0454
                </a>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div className="contact-details">
                <h3>Headquarters</h3>
                <p className="contact-text">Winston-Salem, NC, USA</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                </svg>
              </div>
              <div className="contact-details">
                <h3>Website</h3>
                <a href="https://bridgeinthegapworldwide.org" target="_blank" rel="noopener noreferrer" className="contact-link">
                  bridgeinthegap.org
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="social-section">
          <h2>Connect With Us</h2>
          <p className="social-description">Follow us on social media to stay updated with our latest programs and initiatives</p>
          
          {loading ? (
            <div className="contact-loading">
              <div className="contact-spinner"></div>
              <p>Loading social links...</p>
            </div>
          ) : error ? (
            <div className="contact-error">
              <p>Unable to load social media links</p>
            </div>
          ) : (
            <div className="social-links-grid">
              {socialLinks.map((social) => (
                <a
                  key={social._id}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link-card"
                >
                  <div className="social-icon-wrapper">
                    <img 
                      src={social.icon?.cloudinaryUrl || social.cloudinaryUrl} 
                      alt={social.name}
                      className="social-icon-image"
                    />
                  </div>
                  <span className="social-name">{social.name}</span>
                  <div className="social-arrow">→</div>
                </a>
              ))}
            </div>
          )}

          {!loading && !error && socialLinks.length === 0 && (
            <div className="no-social-links">
              <p>No social media links available at the moment.</p>
            </div>
          )}
        </div>

        <div className="contact-cta-section">
          <div className="contact-cta-content">
            <h2>Ready to Make a Difference?</h2>
            <p>Join us in bridging the gap and creating positive change in communities worldwide</p>
            <div className="contact-cta-buttons">
              <a href="mailto:info@bridgeinthegap.org" className="contact-cta-btn primary">
                Send Us a Message
              </a>
              <a href="tel:+19805500454" className="contact-cta-btn secondary">
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
import React, { useState, useEffect, useRef } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import '../styles/Partners.css';

const pic = `${process.env.PUBLIC_URL}/involved2.png`

function Partners() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});
  const formRef = useRef();
  
  // Formspree hook
  const [state, handleSubmit] = useForm("xeorrylj");

  useEffect(() => {
    fetchPartners();
  }, []);

  // Reset form after successful submission
  useEffect(() => {
    if (state.succeeded) {
      formRef.current.reset();
      // Hide success message after 5 seconds
      const timer = setTimeout(() => {
        window.location.reload(); // This will reset the Formspree state
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state.succeeded]);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://bridge-server-zb9l.onrender.com/partners');
      
      if (!response.ok) {
        throw new Error('Failed to fetch partners');
      }
      
      const data = await response.json();
      const partnersArray = data.partners || data || [];
      setPartners(partnersArray);
      setLoading(false);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const toggleExpand = (partnerId) => {
    setExpandedCards(prev => ({
      ...prev,
      [partnerId]: !prev[partnerId]
    }));
  };

  if (loading) {
    return (
      <div className="partners-container">
        <div className="partners-loading">
          <div className="spinner"></div>
          <p>Loading partners...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="partners-container">
        <div className="partners-error">
          <p>Error loading partners: {error}</p>
          <button onClick={fetchPartners} className="retry-btn">Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="partners-container">
      <div className="partners-hero"
       style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.62), rgba(0, 0, 0, 0.71)), url(${pic})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}>
        <h1>Ready to Make a Difference?</h1>
        <p className="hero-description">
          Join us in our mission to bridge gaps and create opportunities. Whether through volunteering, partnerships, or donations, your involvement makes a real impact.
        </p>
      </div>

      <section className="mission-section">
        <div className="mission-content">
          <p className="mission-text">
            When you agree on a common idea and work towards it together, you can create something special. We are using the resources you and I bring together to raise the foundation of many generations through education.
          </p>
          <p className="mission-text highlight">
            Bridge In The Gap Worldwide is a beacon of hope—uniting communities and empowering individuals to overcome barriers.
          </p>
        </div>
      </section>

      <section className="partners-section">
        <div className="section-header">
          <h2>Our Partners</h2>
          <h3>Corporate Partners</h3>
          <p className="partners-intro">
            A heartfelt thank you to our corporate sponsors! Your generous support powers Bridge In The Gap Worldwide's mission to empower communities, close divides, and create lasting change. You are the driving force that fuels our vision. Together, we're building a brighter future.
          </p>
        </div>

        {partners.length > 0 ? (
          <div className="partners-grid">
            {partners.map((partner) => (
              <div key={partner._id} className="partner-card">
                <div className="partner-logo-container">
                  {partner.cloudinaryUrl ? (
                    <img 
                      src={partner.cloudinaryUrl} 
                      alt={partner.title || 'Partner logo'}
                      className="partner-logo"
                    />
                  ) : (
                    <div className="no-logo">
                      <p>No logo available</p>
                    </div>
                  )}
                </div>

                <div className="partner-info">
                  <h4 className="partner-name">{partner.title}</h4>
                  <p className={`partner-story ${expandedCards[partner._id] ? 'expanded' : ''}`}>
                    {partner.description}
                  </p>
                  {partner.description && partner.description.length > 200 && (
                    <button 
                      className="expand-btn"
                      onClick={() => toggleExpand(partner._id)}
                      aria-label={expandedCards[partner._id] ? "Show less" : "Show more"}
                    >
                      <div className={`arrow-circle ${expandedCards[partner._id] ? 'rotated' : ''}`}>
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 16 16" 
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            d="M4 6L8 10L12 6" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-partners">
            <p>We're currently building our network of partners. Stay tuned!</p>
          </div>
        )}
      </section>

      <section className="volunteer-section">
        <div className="volunteer-container">
          <div className="volunteer-header">
            <h2>Want to Volunteer?</h2>
            <p className="volunteer-description">
              Ready to make an impact? Fill out the form below and let us know how you'd like to help. 
              We'll get back to you as soon as possible!
            </p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="volunteer-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  placeholder="Enter your first name"
                  disabled={state.submitting}
                />
                <ValidationError 
                  prefix="First Name" 
                  field="firstName"
                  errors={state.errors}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  placeholder="Enter your last name"
                  disabled={state.submitting}
                />
                <ValidationError 
                  prefix="Last Name" 
                  field="lastName"
                  errors={state.errors}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="your.email@example.com"
                  disabled={state.submitting}
                />
                <ValidationError 
                  prefix="Email" 
                  field="email"
                  errors={state.errors}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  placeholder="(123) 456-7890"
                  disabled={state.submitting}
                />
                <ValidationError 
                  prefix="Phone" 
                  field="phone"
                  errors={state.errors}
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows="5"
                placeholder="Tell us how you'd like to volunteer and any questions you have..."
                disabled={state.submitting}
              ></textarea>
              <ValidationError 
                prefix="Message" 
                field="message"
                errors={state.errors}
              />
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={state.submitting}
            >
              {state.submitting ? 'Sending...' : 'Send Message'}
            </button>

            {state.succeeded && (
              <div className="form-message success">
                Thank you! Your message has been sent successfully. We'll be in touch soon!
              </div>
            )}

            {state.errors && state.errors.length > 0 && !state.succeeded && (
              <div className="form-message error">
                Oops! Something went wrong. Please check your form and try again.
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}

export default Partners;
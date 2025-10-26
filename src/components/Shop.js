import React, { useState, useEffect } from 'react';
import '../styles/Shop.css';

const pic = `${process.env.PUBLIC_URL}/hoodie2.png`
const pic2 = `${process.env.PUBLIC_URL}/hoodie8.png`

function Shop() {
  const [shopItems, setShopItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchShopItems();
  }, []);

  const fetchShopItems = async () => {
    try {
      setLoading(true);
      // *** FIX APPLIED HERE: Changed /shop-items to /shop ***
      const response = await fetch('https://bridge-server-zb9l.onrender.com/shop'); 
      
      if (!response.ok) {
        throw new Error('Failed to fetch shop items: ' + response.statusText);
      }
      
      const data = await response.json();
      
      // The server returns { shopItems: [...] }, so we extract it.
      const itemsArray = data.shopItems || []; 
      
      setShopItems(itemsArray);
      setLoading(false);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
      setLoading(false);
    }
  };
  
  // ... (rest of the component JSX remains the same)
  // ... (loading, error, and return JSX)
  
  if (loading) {
    return (
      <div className="shop-container">
        <div className="shop-loading">
          <div className="shop-spinner"></div>
          <p>Loading shop items...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="shop-container" id="shop">
        <div className="shop-error">
          <p>Error loading shop items: {error}</p>
          <button onClick={fetchShopItems} className="shop-retry-btn">Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="shop-container">
      <div className="shop-hero"
       style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.62), rgba(0, 0, 0, 0.71)), url(${pic})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}>
        <h1>Shop & Support</h1>
        <h2>Custom Shirts Tailored Just for You!</h2>
        <p className="shop-intro">
          Ready to wear your ideas and make a difference? At Bridge In The Gap Worldwide, 
          we design and print any kind of shirts—from bold graphic tees and professional 
          polos to event hoodies and custom apparel for your brand.
        </p>
        <p className="shop-tagline">
          Whether it's for personal style, team uniforms, or promotional gear, we've got you covered!
        </p>
      </div>

      <div className="shop-why-choose-section"
       style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.62), rgba(0, 0, 0, 0.71)), url(${pic2})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}>
        <h3>Why Choose Us</h3>
        <div className="shop-features-grid">
          <div className="shop-feature-card">
            <h4>Unlimited Designs Until You're Satisfied</h4>
            <p>We'll perfect your vision with unlimited revisions at no extra cost.</p>
          </div>
          <div className="shop-feature-card">
            <h4>Any Style, Any Print</h4>
            <p>Premium materials, vibrant colors, and durable prints. Choose cotton, blends, 
               or performance fabrics—screen printing, DTG, or embroidery.</p>
          </div>
          <div className="shop-feature-card">
            <h4>Support a Cause</h4>
            <p>100% of proceeds support our community projects. Every shirt fuels positive impact.</p>
          </div>
          <div className="shop-feature-card">
            <h4>Easy Ordering</h4>
            <p>Upload your ideas, approve the design, and we'll handle the rest. 
               Fast turnaround and direct shipping.</p>
          </div>
        </div>
      </div>

      <div className="shop-cta-section">
        <p className="shop-cta-text">
          🛍️ Create a shirt that's uniquely yours and supports our mission.
        </p>
        <a href="sms:+19805500454" className="shop-get-started-btn" style={{ textDecoration: 'none', marginTop: '10px', fontFamily: 'montserrat' }}>
  Get Started
</a>
      </div>

      <div className="shop-items-section">
        <h3>Our Custom Designs</h3>
        <div className="shop-grid">
          {shopItems.map((item) => (
            <div key={item._id} className="shop-item-card">
              <div className="shop-item-image-container">
                <img 
                  src={item.cloudinaryUrl} 
                  alt={item.originalName || item.title}
                  className="shop-item-image"
                />
              </div>
              <div className="shop-item-content">
                <h4 className="shop-item-title">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>

        {shopItems.length === 0 && (
          <div className="shop-no-items">
            <p>No shop items available at the moment. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Shop;
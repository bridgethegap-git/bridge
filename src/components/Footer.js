import React from 'react'
import '../styles/Footer.css'

function Footer() {
  return (
    <footer className="footer-body">
      <div className="footer-container">
        
        {/* Left Section – Mission Summary */}
        <div className="footer-about">
          <h2 className="footer-logo">Bridge In The Gap Worldwide</h2>
          <p className="footer-tagline">Building Bridges, Transforming Lives</p>
          <p className="footer-desc">
            Empowering communities through education, technology, and sustainable development initiatives 
            that create lasting positive change around the world.
          </p>
          <div className="footer-stats">
            <div><span>8K+</span><p>Lives Impacted</p></div>
            <div><span>2</span><p>Countries</p></div>
            <div><span>3</span><p>Project Types</p></div>
          </div>
         <a href="#donate" className="donate-btn">
  <span>Donate Now</span>
</a>
        </div>

        {/* Middle Section – Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/programs">Programs</a></li>
            <li><a href="/shop">Shop & Support</a></li>
            <li><a href="/partners">Partners</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Right Section – Contact & Social */}
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p><strong>Email:</strong> info@bridgeinthegap.org</p>
          <p><strong>Phone:</strong> (980) 550-0454</p>
          <p><strong>Address:</strong> Winston-Salem, NC, USA</p>

          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">Youtube</a>
          </div>

          <p className="footer-donors">
            <strong>Donors:</strong> Enhearten Unseen Leaders • Wegmans • Panda Express
          </p>
        </div>
      </div>

      <div className="footer-bottom">
       <p>© {new Date().getFullYear()} Bridge In The Gap Worldwide. Developed and designed by Apollo Creations.</p>

      </div>
    </footer>
  )
}

export default Footer

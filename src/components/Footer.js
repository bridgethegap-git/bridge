import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Youtube } from 'lucide-react'
import '../styles/Footer.css'

const pic = `${process.env.PUBLIC_URL}/trans.jpeg`
const link = 'https://www.zeffy.com/en-US/donation-form/aa13ac2d-07c5-42fd-8f8c-aba90133e72f'

function Footer() {
  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

          {/* Transparency Badge */}
          <div className="footer-transparency">
            <img src={pic} alt="Badge of Transparency" className="transparency-badge" />
            <div className="transparency-info">
              <h4>OUR BADGE OF TRANSPARENCY</h4>
              <p>EIN: 93-3592016</p>
              <p>501(c)(3) Public Charity</p>
            </div>
          </div>

          {/* Donate Button */}
          <a
            href={link}
            className="donate-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Donate Now</span>
          </a>
        </div>

        {/* Middle Section – Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/about" onClick={scrollToTop}>About Us</Link></li>
            <li><Link to="/programs" onClick={scrollToTop}>Programs</Link></li>
            <li><Link to="/shop" onClick={scrollToTop}>Shop & Support</Link></li>
            <li><Link to="/partners" onClick={scrollToTop}>Partners</Link></li>
            <li><Link to="/contact" onClick={scrollToTop}>Contact</Link></li>
          </ul>
        </div>

        {/* Right Section – Contact & Social */}
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p><strong>Email:</strong> info@bridgeinthegap.org</p>
          <p><strong>Phone:</strong> (980) 550-0454</p>
          <p><strong>Address:</strong> Winston-Salem, NC, USA</p>

          <div className="footer-socials">
            <a href="https://www.facebook.com/bridgeinthegapworldwide" target="_blank" rel="noreferrer">
              <Facebook size={20} color="rgba(255, 255, 255, 0.7)" />
              <span>Facebook</span>
            </a>
            <a href="https://www.instagram.com/bridgeinthegap23/" target="_blank" rel="noreferrer">
              <Instagram size={20} color="rgba(255, 255, 255, 0.7)" />
              <span>Instagram</span>
            </a>
            <a href="https://www.youtube.com/@bridgeinthegapworldwide" target="_blank" rel="noreferrer">
              <Youtube size={20} color="rgba(255, 255, 255, 0.7)" />
              <span>Youtube</span>
            </a>
          </div>

          <p className="footer-donors">
            <strong>Partners:</strong> Enhearten Unseen Leaders • Wegmans • Panda Express
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Bridge In The Gap Worldwide. Developed and designed by Apollo Creations.
        </p>
      </div>
    </footer>
  )
}

export default Footer

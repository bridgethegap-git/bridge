import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';

const pic = `${process.env.PUBLIC_URL}/logo1.png`

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Scroll to top whenever the route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
  const closeSidebar = () => {
    setIsSidebarOpen(false);
    // Scroll to top when closing sidebar
    window.scrollTo(0, 0);
  };

  // Function for scrolling to top (for desktop nav)
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <header className="header-body">
        <div className="header-container">
          <div className="logo">
            <img src={pic} alt="Bridge In The Gap Worldwide Logo" className="logo-image" />
            <span className="logo-text">Bridge In The Gap Worldwide</span>
          </div>
          <nav className="desktop-nav">
            <Link to="/" onClick={scrollToTop}>Home</Link>
            <Link to="/about" onClick={scrollToTop}>About</Link>
            <Link to="/programs" onClick={scrollToTop}>Programs</Link>
            <Link to="/partners" onClick={scrollToTop}>Get Involved</Link>
            <Link to="/shop" onClick={scrollToTop}>Shop</Link>
            <Link to="/contact" onClick={scrollToTop}>Contact</Link>
          </nav>
          <button className="hamburger" onClick={toggleSidebar} aria-label="Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={closeSidebar} aria-label="Close menu">
          ×
        </button>
        <nav className="sidebar-nav">
          <Link to="/" onClick={closeSidebar}>Home</Link>
          <Link to="/about" onClick={closeSidebar}>About</Link>
          <Link to="/programs" onClick={closeSidebar}>Programs</Link>
          <Link to="/partners" onClick={closeSidebar}>Get Involved</Link>
          <Link to="/shop" onClick={closeSidebar}>Shop</Link>
          <Link to="/contact" onClick={closeSidebar}>Contact</Link>
        </nav>
      </div>

      {/* Overlay */}
      {isSidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}
    </>
  );
}

export default Header;
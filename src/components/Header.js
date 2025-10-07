import React, { useState } from 'react';
import '../styles/Header.css';

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <header className='header-body'>
        <div className='header-container'>
          <div className='logo'>
            <span className='logo-text'>Bridge In The Gap Worldwide</span>
          </div>
          
          <nav className='desktop-nav'>
            <a href='#home'>Home</a>
            <a href='#about'>About</a>
            <a href='#programs'>Programs</a>
            <a href='#get-involved'>Get Involved</a>
            <a href='#shop'>Shop</a>
            <a href='#contact'>Contact</a>
          </nav>

          <button className='hamburger' onClick={toggleSidebar} aria-label="Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className='close-btn' onClick={closeSidebar} aria-label="Close menu">
          ×
        </button>
        <nav className='sidebar-nav'>
          <a href='#home' onClick={closeSidebar}>Home</a>
          <a href='#about' onClick={closeSidebar}>About</a>
          <a href='#programs' onClick={closeSidebar}>Programs</a>
          <a href='#get-involved' onClick={closeSidebar}>Get Involved</a>
          <a href='#shop' onClick={closeSidebar}>Shop</a>
          <a href='#contact' onClick={closeSidebar}>Contact</a>
        </nav>
      </div>

      {/* Overlay */}
      {isSidebarOpen && <div className='overlay' onClick={closeSidebar}></div>}
    </>
  );
}

export default Header;
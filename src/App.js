import React from 'react';
// Change BrowserRouter to HashRouter
import { HashRouter, Routes, Route } from 'react-router-dom'; 
import Home from './components/Home';
import About from './components/About';
import Header from './components/Header';
import Footer from './components/Footer';
import Admin from './components/Admin';
import Programs from './components/Programs';
import Partners from './components/Partners';
import Shop from './components/Shop';
import Contact from './components/ContactUs';

function App() {
  return (
    // Replaced BrowserRouter with HashRouter. 
    // Basename is usually unnecessary here, as the hash handles the routing structure.
    <HashRouter> 
      <div className="App">
        <Header />
        <Routes>
          {/* Routes remain the same */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin232323" element={<Admin />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />

        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
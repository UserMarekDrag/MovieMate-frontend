import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'


import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.classList.toggle('overflow-hidden');
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.classList.remove('overflow-hidden');
  };

  return (
    <nav className="navbar">
      <div className="navbar-section" />
      <Link to="/" className="navbar-brand" onClick={closeMenu}>MovieMate</Link>
      <div className="navbar-section">
        <div className="menu-icon" onClick={toggleMenu}>
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </div>
        <div className={`navbar-links ${isOpen ? "show-nav" : ""}`}>
          <Link to="/" onClick={closeMenu}>Search</Link>
          <Link to="/login" onClick={closeMenu}>Login</Link>
          <Link to="/register" onClick={closeMenu}>Register</Link>
          <Link to="/profile" onClick={closeMenu}>Profile</Link>
          <Link to="/about" onClick={closeMenu}>About us</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

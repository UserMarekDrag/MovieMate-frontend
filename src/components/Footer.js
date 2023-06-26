import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/privacy-policy">Privacy</Link>
          <Link to="/terms-of-service">Terms</Link>
        </div>
        <p>&copy; {new Date().getFullYear()} MovieMate by Marek Drąg</p>
      </div>
    </footer>
  );
}

export default Footer;
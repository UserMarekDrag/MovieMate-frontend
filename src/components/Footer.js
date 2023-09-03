import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} MovieMate created by Marek Drąg</p>
      </div>
    </footer>
  );
}

export default Footer;
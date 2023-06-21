// Importowanie wymaganych modułów i komponentów
import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/privacy-policy">Polityka prywatności</Link>
          <Link to="/terms-of-service">Warunki korzystania</Link>
        </div>
        <p>&copy; {new Date().getFullYear()} CinemaApp</p>
      </div>
    </footer>
  );
}

export default Footer;

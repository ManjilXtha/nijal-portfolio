import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic';

const navLinks = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [menuActive, setMenuActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuActive(false);
  }, [location.pathname]);

  return (
    <>
      <header className={`header ${scrolled ? 'header--hidden' : ''}`} style={{ opacity: isHome ? 0 : 1, pointerEvents: isHome ? 'none' : 'auto' }}>
        <Link to="/" className="header__logo">
          <div className="header__logo-inner">
            <span className="header__logo-copy">©</span>
            <div className="header__logo-name">
              <span className="header__logo-first">Code by</span>
              <span className="header__logo-last">Nijal</span>
            </div>
          </div>
        </Link>

        <nav className="header__nav">
          {navLinks.map((link) => (
            <Magnetic key={link.label} strength={0.2}>
              <div className="header__nav-item">
                <Link to={link.href} className="header__nav-link" data-text={link.label}>
                  <span>{link.label}</span>
                </Link>
                <div className="header__nav-dot" />
              </div>
            </Magnetic>
          ))}
        </nav>
      </header>

      {/* Persistent Sticky Hamburger Menu */}
      <div className={`menu-wrapper ${scrolled ? 'menu-wrapper--visible' : ''}`}>
        <Magnetic strength={0.4}>
          <button
            className={`menu-btn ${menuActive ? 'menu-btn--active' : ''}`}
            onClick={() => setMenuActive(!menuActive)}
          >
            <div className="menu-btn__burger" />
          </button>
        </Magnetic>
      </div>

      {/* Nav Overlay */}
      <AnimatePresence>
        {menuActive && (
          <>
            <motion.div 
              className="nav-overlay__backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuActive(false)}
            />
            <motion.nav
              className="nav-overlay"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="nav-overlay__inner">
                <div className="nav-overlay__header">
                  <span className="nav-overlay__label">Navigation</span>
                </div>
                <div className="nav-overlay__list">
                  <Link to="/" className="nav-overlay__link">Home</Link>
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.label}
                      initial={{ x: 80, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    >
                      <Link to={link.href} className="nav-overlay__link">
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <div className="nav-overlay__footer">
                  <span className="nav-overlay__label">Socials</span>
                  <div className="nav-overlay__socials">
                    <a href="#">LinkedIn</a>
                    <a href="#">Instagram</a>
                    <a href="#">Twitter</a>
                  </div>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

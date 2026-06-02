import { useState, useEffect, useRef, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import Preloader from './components/Preloader';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Work from './pages/Work';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';

function AppContent() {
  const location = useLocation();
  const cursorRef = useRef(null);
  const lenisRef = useRef(null);

  // Smooth scrolling with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Reset scroll on route change
    lenis.scrollTo(0, { immediate: true });

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [location.pathname]);

  // Custom cursor
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, 'left', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'top', { duration: 0.5, ease: 'power3.out' });

    const moveCursor = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const addHover = () => cursor.classList.add('link-hover');
    const removeHover = () => cursor.classList.remove('link-hover');
    const hoverTargets = 'a, button, .works__item, .menu-btn, .about__btn, .footer__cta-btn, .works__more-btn';

    window.addEventListener('mousemove', moveCursor);
    const handleOver = (e) => { if (e.target.closest(hoverTargets)) addHover(); };
    const handleOut = (e) => { if (e.target.closest(hoverTargets)) removeHover(); };
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, []);

  return (
    <div className="page">
      <div ref={cursorRef} className="cursor" />
      <Header />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route index element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <Router>
      <Preloader onComplete={handlePreloaderComplete} />
      {!loading && <AppContent />}
    </Router>
  );
}

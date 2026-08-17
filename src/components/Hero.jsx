import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import HeroCarousel from './HeroCarousel';
import './Hero.css';

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations to match the premium Lesmana feel
      gsap.from('.hero-nav', {
        y: -30,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      });

      gsap.from('.hero-portrait', {
        y: 60,
        opacity: 0,
        scale: 1.05,
        duration: 1.6,
        ease: 'power4.out',
        delay: 0.2,
      });

      gsap.from('.hero-bottom__subtitle', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.4,
      });

      gsap.from('.hero-bottom__title', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.5,
      });

      gsap.from('.hero-bottom__action', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.7,
      });

      gsap.from('.hero-bottom__right', {
        x: 30,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.8,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-poster" ref={containerRef}>
      {/* Top Navigation */}
      <nav className="hero-nav">
        <Link to="/" className="hero-nav__logo">
          Nijal.
        </Link>
        <div className="hero-nav__info-group">
          <div className="hero-nav__info-item">
            <span className="hero-nav__info-label">Available for projects</span>
            <span className="hero-nav__info-val">2 Slots Available</span>
          </div>
          <div className="hero-nav__info-item">
            <span className="hero-nav__info-label">Based in</span>
            <span className="hero-nav__info-val">Kathmandu, Nepal</span>
          </div>
        </div>
        <div className="hero-nav__right">
          <div className="hero-nav__links">
            <Link to="/about" className="hero-nav__link">About</Link>
            <Link to="/work" className="hero-nav__link">Works</Link>
            <Link to="/contact" className="hero-nav__link">Contact</Link>
          </div>
          <Link to="/contact" className="hero-nav__btn">
            <span>Start a project</span>
            <div className="hero-nav__btn-arrow">→</div>
          </Link>
        </div>
      </nav>

      {/* Curved Carousel behind portrait */}
      <HeroCarousel />

      {/* Center Portrait */}
      <div className="hero-portrait">
        <img src="/portrait.png" alt="Nijal Tamrakar" />
      </div>

      {/* Bottom Area */}
      <div className="hero-bottom">
        <div className="hero-bottom__left">
          <span className="hero-bottom__subtitle">HI, I'M NIJAL</span>
          <h1 className="hero-bottom__title">
            Creative Developer<br />& Designer
          </h1>
          <Link to="/contact" className="hero-bottom__action">
            <span>Start a project</span>
            <div className="hero-bottom__action-circle">→</div>
          </Link>
        </div>
        <div className="hero-bottom__right">
          <p className="hero-bottom__desc">
            I help ambitious brands turn their vision into reality through premium web experiences, combining clean code with immersive interactions.
          </p>
          <div className="hero-bottom__signature">
            Nijal Tamrakar
          </div>
        </div>
      </div>
    </section>
  );
}

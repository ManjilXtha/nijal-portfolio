import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Hero.css';

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations for a premium feel
      gsap.from('.hero-poster__text-lab', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.1
      });
      gsap.from('.hero-poster__text-001', {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3
      });
      gsap.from('.hero-poster__person', {
        scale: 1.05,
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.4
      });
      gsap.from('.hero-poster__orange-box', {
        scaleX: 0,
        transformOrigin: 'right',
        duration: 1.2,
        ease: 'power4.inOut',
        delay: 0
      });
      gsap.from('.hero-poster__nav span', {
        y: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.5
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-poster" ref={containerRef}>
      <div className="hero-poster__orange-box">
        {/* Arrow Button */}
        <div className="hero-poster__arrow-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
      
      {/* Top Navigation inside poster */}
      <nav className="hero-poster__nav">
        <div className="hero-poster__nav-left">
          <span>+1</span>
          <span>PROJECTS</span>
        </div>
        <div className="hero-poster__nav-right">
          <span>AW19</span>
          <span>SHOP</span>
          <span>NEW ARRIVALS ▼</span>
          <span>...</span>
        </div>
      </nav>

      {/* Main Typography */}
      <div className="hero-poster__content">
        <div className="hero-poster__small-texts">
          <div className="hero-poster__small-col">
            <h4 className="hero-poster__small-title">X/LABS</h4>
            <div className="hero-poster__small-line"></div>
            <p className="hero-poster__small-desc">
              FOR AUTHENTICATION OF X-LABS UNREAL SPRING/
              <br />SUMMER COLLECTION AND PROTECTION
              <br />KEEP UNSEEN
            </p>
          </div>
          <div className="hero-poster__small-col hero-poster__small-col--offset">
            <div className="hero-poster__small-line"></div>
            <p className="hero-poster__small-desc">
              FOR AUTHENTICATION OF X-LABS UNREAL SPRING/
              <br />SUMMER COLLECTION AND PROTECTION
              <br />KEEP UNSEEN
            </p>
          </div>
        </div>

        <h1 className="hero-poster__text-lab">lab.</h1>
        <div className="hero-poster__text-001-container">
          <div className="hero-poster__text-001">001</div>
        </div>
      </div>

      {/* Right Side Rotated Text */}
      <div className="hero-poster__rotated-right">
        X-LAB<br/>
        MATERIALS OF<br/>
        CREATION 2019
      </div>

      {/* Center Image */}
      <div className="hero-poster__person">
        <img src="/portrait.png" alt="Person" />
      </div>
    </section>
  );
}

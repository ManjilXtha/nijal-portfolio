import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Magnetic from './Magnetic';

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Asia/Kathmandu',
          hour12: true,
        }) + ' NPT'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const headingText = "Let's work together";

  const letterVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: i * 0.02,
        ease: [0.76, 0, 0.24, 1],
      },
    }),
  };

  return (
    <footer className="footer" id="contact" ref={ref}>
      <div className="footer__curve">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,100 C480,0 960,0 1440,100 L1440,100 L0,100 Z" fill="var(--black)" />
        </svg>
      </div>

      <div className="footer__inner">
        <div className="footer__top">
          <h2 className="footer__heading">
             <div style={{ display: 'flex', overflow: 'hidden' }}>
               {headingText.split('').map((letter, i) => (
                 <motion.span
                    key={i}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    style={{ display: 'inline-block', whiteSpace: letter === ' ' ? 'pre' : 'normal' }}
                 >
                   {letter}
                 </motion.span>
               ))}
             </div>
          </h2>

          <motion.div
            className="footer__cta"
            initial={{ y: 60, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
          >
            <Magnetic strength={0.25}>
              <a href="mailto:hello@nijaltamrakar.com" className="footer__cta-btn">
                Get in touch
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <div className="footer__line" />

        <motion.div
          className="footer__bottom"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="footer__info">
            <div className="footer__info-col">
              <span className="footer__label">Version</span>
              <span className="footer__value">2024 © Edition</span>
            </div>
            <div className="footer__info-col">
              <span className="footer__label">Local time</span>
              <span className="footer__value">{time}</span>
            </div>
          </div>

          <div className="footer__socials-wrap">
            <span className="footer__label">Socials</span>
            <div className="footer__socials">
              {['LinkedIn', 'Instagram', 'GitHub', 'Twitter'].map((s) => (
                <Magnetic key={s} strength={0.1}>
                  <a href="#" className="footer__social-link">{s}</a>
                </Magnetic>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

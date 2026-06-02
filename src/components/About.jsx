import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import Magnetic from './Magnetic';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const headingText = "The combination of my passion for design, code & interaction positions me in a unique place in the web design world";
  const bodyText = "I help ambitious businesses turn their vision into reality through premium web experiences. With a keen eye for design and a commitment to clean, performant code, I create websites and digital products that look stunning and deliver measurable results.";

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
      },
    },
  };

  const wordVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <section className="about" id="about" ref={ref}>
      <div className="about__inner">
        <div className="about__left">
          <motion.div
            className="about__heading"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.2em' }}
          >
            {headingText.split(' ').map((word, i) => (
              <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
                <motion.span variants={wordVariants} style={{ display: 'inline-block' }}>
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.div>
        </div>
        <div className="about__right">
          <motion.div
            className="about__text"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.15em' }}
          >
            {bodyText.split(' ').map((word, i) => (
              <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
                <motion.span variants={wordVariants} style={{ display: 'inline-block' }}>
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.div>
          <motion.div
            className="about__btn-wrap"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1, ease: [0.76, 0, 0.24, 1] }}
          >
            <Magnetic>
              <a href="#about" className="about__btn">
                About me
                <svg viewBox="0 0 10 10" fill="none">
                  <path d="M1 9L9 1M9 1H2M9 1V8" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

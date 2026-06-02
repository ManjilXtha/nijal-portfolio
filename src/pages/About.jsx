import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Magnetic from '../components/Magnetic';

export default function AboutPage() {
  const containerRef = useRef(null);
  
  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
  };

  return (
    <motion.div 
      className="about-page section-padding"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="about-page__inner" ref={containerRef}>
        <motion.h1 
          className="page-heading" 
          style={{ marginBottom: '100px', maxWidth: '1200px' }}
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Helping brands to stand out in the digital era. Together we will set the new standard. No nonsense, always on the edge.
        </motion.h1>

        <div className="about-page__content">
          <div className="about-page__text-column">
            <motion.p 
               variants={slideUp}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
             >
              The combination of my passion for design, code & interaction positions me in a unique place in the web design world.
            </motion.p>
            <motion.p 
               variants={slideUp}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
             >
               With a keen eye for aesthetics and a deep understanding of technical implications, I bridge the gap between imagination and reality seamlessly.
            </motion.p>
          </div>
        </div>

        <div className="about-page__services">
          <motion.h3 
             className="about-page__services-title"
             variants={slideUp}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
           >
             I can help you with ...
          </motion.h3>
          <div className="services-grid">
            <motion.div className="service-card" variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h4>01</h4>
              <div className="service-card__icon" />
              <h3>Design</h3>
              <p>With a solid track record in designing websites and apps, I deliver strong and user-friendly digital designs. Solid company branding is the foundation of any successful website.</p>
            </motion.div>
            <motion.div className="service-card" variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h4>02</h4>
              <div className="service-card__icon" />
              <h3>Development</h3>
              <p>I build scalable websites from scratch that fit seamlessly with design. My focus is on micro animations, transitions and interaction. For content management I use globally recognized systems.</p>
            </motion.div>
            <motion.div className="service-card" variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h4>03</h4>
              <div className="service-card__icon" />
              <h3>The full package</h3>
              <p>A complete website from concept to implementation, that's what makes me stand out. My great sense for design and my development skills enable me to create kick-ass projects.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

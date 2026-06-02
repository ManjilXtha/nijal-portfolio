import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import Magnetic from './Magnetic';

const projects = [
  { title: 'Pixel Studio', category: 'Design & Development', year: '2024', color: '#8C8C73' },
  { title: 'Urban Collective', category: 'Design & Development', year: '2024', color: '#EFE8D3' },
  { title: 'ArtLens Gallery', category: 'Creative Direction', year: '2023', color: '#706D63' },
  { title: 'Nomad Digital', category: 'Design & Development', year: '2023', color: '#C2C2C2' },
];

export default function Works() {
  const [activeIndex, setActiveIndex] = useState(null);
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const viewLabelRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10%' });

  useEffect(() => {
    const xImg = gsap.quickTo(imageRef.current, 'left', { duration: 0.6, ease: 'power3.out' });
    const yImg = gsap.quickTo(imageRef.current, 'top', { duration: 0.6, ease: 'power3.out' });
    const rImg = gsap.quickTo(imageRef.current, 'rotate', { duration: 0.6, ease: 'power3.out' });
    const xLabel = gsap.quickTo(viewLabelRef.current, 'left', { duration: 0.5, ease: 'power3.out' });
    const yLabel = gsap.quickTo(viewLabelRef.current, 'top', { duration: 0.5, ease: 'power3.out' });

    let lastX = 0;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const rotation = (clientX - lastX) * 0.15;
      lastX = clientX;

      xImg(clientX - 200);
      yImg(clientY - 150);
      rImg(rotation);
      xLabel(clientX - 50);
      yLabel(clientY - 50);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const show = activeIndex !== null;
    gsap.to(imageRef.current, {
      opacity: show ? 1 : 0,
      scale: show ? 1 : 0,
      duration: 0.4,
      ease: 'power2.out',
    });
    gsap.to(viewLabelRef.current, {
      opacity: show ? 1 : 0,
      scale: show ? 1 : 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, [activeIndex]);

  return (
    <section className="works" id="works" ref={containerRef}>
      <div className="works__inner">
        <motion.p
          className="works__heading"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          Recent work
        </motion.p>

        <div className="works__list">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href="#"
              className="works__item"
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.76, 0, 0.24, 1] }}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <h3 className="works__item-title">{p.title}</h3>
              <div className="works__item-meta">
                <span className="works__item-label">{p.category}</span>
                <span className="works__item-label">{p.year}</span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Floating image with follow cursor + rotation */}
        <div
          ref={imageRef}
          className="works__image-container"
          style={{ opacity: 0, transform: 'scale(0)' }}
        >
          <div
            className="works__image-inner"
            style={{
              background: activeIndex !== null ? projects[activeIndex]?.color : '#555',
              transition: 'background 0.4s',
            }}
          >
            {activeIndex !== null && (
               <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 300 }}>
                 {projects[activeIndex]?.title}
               </div>
            )}
          </div>
        </div>

        {/* View label */}
        <div
          ref={viewLabelRef}
          className="works__view-label"
          style={{ opacity: 0, transform: 'scale(0)' }}
        >
          View
        </div>

        <div className="works__more">
          <Magnetic strength={0.4}>
            <a href="#" className="works__more-btn">More work</a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

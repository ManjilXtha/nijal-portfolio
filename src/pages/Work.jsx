import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import Magnetic from '../components/Magnetic';

const categories = ['All', 'Design', 'Development'];

const allProjects = [
  { id: 1, title: 'Pixel Studio', client: 'Pixel', role: 'Design & Development', year: '2024', category: 'Both', color: '#8C8C73' },
  { id: 2, title: 'Urban Collective', client: 'Urban', role: 'Design', year: '2024', category: 'Design', color: '#EFE8D3' },
  { id: 3, title: 'ArtLens Gallery', client: 'ArtLens', role: 'Development', year: '2023', category: 'Development', color: '#706D63' },
  { id: 4, title: 'Nomad Digital', client: 'Nomad', role: 'Design & Development', year: '2023', category: 'Both', color: '#C2C2C2' },
  { id: 5, title: 'TechNova', client: 'TechNova', role: 'Development', year: '2022', category: 'Development', color: '#88A0A8' },
];

export default function Work() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  
  // Custom cursor logic for images
  const [activeIndex, setActiveIndex] = useState(null);
  const imageRef = useRef(null);
  const viewLabelRef = useRef(null);

  useEffect(() => {
    if (viewMode !== 'list') return;
    
    const xImg = gsap.quickTo(imageRef.current, 'left', { duration: 0.6, ease: 'power3.out' });
    const yImg = gsap.quickTo(imageRef.current, 'top', { duration: 0.6, ease: 'power3.out' });
    const xLabel = gsap.quickTo(viewLabelRef.current, 'left', { duration: 0.5, ease: 'power3.out' });
    const yLabel = gsap.quickTo(viewLabelRef.current, 'top', { duration: 0.5, ease: 'power3.out' });

    const handleMouseMove = (e) => {
      xImg(e.clientX - 200);
      yImg(e.clientY - 150);
      xLabel(e.clientX - 50);
      yLabel(e.clientY - 50);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [viewMode]);

  useEffect(() => {
    if (viewMode !== 'list') return;
    const show = activeIndex !== null;
    gsap.to(imageRef.current, {
      opacity: show ? 1 : 0,
      scale: show ? 1 : 0.9,
      duration: 0.4,
      ease: 'power2.out',
    });
    gsap.to(viewLabelRef.current, {
      opacity: show ? 1 : 0,
      scale: show ? 1 : 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, [activeIndex, viewMode]);

  const filteredProjects = allProjects.filter(p => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Design' && (p.category === 'Design' || p.category === 'Both')) return true;
    if (activeCategory === 'Development' && (p.category === 'Development' || p.category === 'Both')) return true;
    return false;
  });

  return (
    <motion.div 
      className="work-page section-padding"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="work-page__inner">
        <h1 className="page-heading">Creating next level <br/>digital products</h1>
        
        <div className="work-filters">
          <div className="work-filters__categories">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="work-filters__view">
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              List
            </button>
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </button>
          </div>
        </div>

        <div className="work-page__list-header" style={{ display: viewMode === 'list' ? 'flex' : 'none' }}>
          <span>Client / Role</span>
          <span>Year</span>
        </div>

        <div className={`work-page__projects ${viewMode === 'grid' ? 'grid-view' : 'list-view'}`}>
          <AnimatePresence>
            {filteredProjects.map((p, i) => (
              <motion.a
                key={p.id}
                href="#"
                className={`work-page__project-card ${viewMode === 'list' ? 'works__item' : 'grid-item'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {viewMode === 'list' ? (
                  <>
                    <h3 className="works__item-title">{p.title}</h3>
                    <div className="works__item-meta">
                      <span className="works__item-label">{p.client} — {p.role}</span>
                      <span className="works__item-label">{p.year}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid-item__image" style={{ background: p.color }}>
                      <span className="grid-item__temp-name">{p.title}</span>
                    </div>
                    <div className="grid-item__info">
                      <h3>{p.title}</h3>
                      <p>{p.role}</p>
                    </div>
                  </>
                )}
              </motion.a>
            ))}
          </AnimatePresence>
        </div>

        {/* Hover elements for list view */}
        {viewMode === 'list' && (
          <>
            <div
              ref={imageRef}
              className="works__image-container"
              style={{ opacity: 0, transform: 'scale(0.9)', pointerEvents: 'none' }}
            >
              <div
                className="works__image-inner"
                style={{
                  background: activeIndex !== null ? filteredProjects[activeIndex]?.color : '#555',
                  transition: 'background 0.4s',
                }}
              ></div>
            </div>
            <div
              ref={viewLabelRef}
              className="works__view-label"
              style={{ opacity: 0, transform: 'scale(0)', zIndex: 100, pointerEvents: 'none' }}
            >
              View
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}

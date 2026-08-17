import { useEffect, useRef } from 'react';
import './HeroCarousel.css';

const carouselImages = [
  { src: '/carousel/project1.png', alt: 'Finance App Design' },
  { src: '/carousel/project2.png', alt: 'E-commerce Website' },
  { src: '/carousel/project3.png', alt: 'Brand Identity' },
  { src: '/carousel/project4.png', alt: 'Social Media Design' },
  { src: '/carousel/project5.png', alt: 'Dashboard UI' },
  { src: '/carousel/project6.png', alt: 'Product Photography' },
];

export default function HeroCarousel() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  // Duplicate the images to ensure we have enough cards to span wide screens (12 cards total)
  const doubleImages = [...carouselImages, ...carouselImages];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId;
    const cards = cardsRef.current.filter(Boolean);
    const cardWidth = 260;
    const gap = 24;
    const cardSpacing = cardWidth + gap;
    const totalWidth = cards.length * cardSpacing;

    // Track position for continuous scroll
    let scrollX = 0;
    const speed = 0.8; // Scroll speed pixels per frame

    // Initialize positions
    const initialPositions = cards.map((_, i) => i * cardSpacing);

    const updateCarousel = () => {
      const width = window.innerWidth;
      const center = width / 2;
      const curveHeight = 85; // How deep the U-curve is
      const maxRotation = 14; // Max tilt rotation in degrees

      scrollX -= speed;
      if (Math.abs(scrollX) >= totalWidth) {
        scrollX = 0;
      }

      cards.forEach((card, i) => {
        // Base X position of card with scroll offset
        let baseX = (initialPositions[i] + scrollX) % totalWidth;

        // Wrap positions to scroll seamlessly
        if (baseX < -cardSpacing) {
          baseX += totalWidth;
        }

        // Translate to centered coordinates relative to screen width
        const relativeX = baseX - center + cardSpacing / 2;
        const normalizedX = relativeX / (width / 2 + cardSpacing);

        // U-shape curve (parabola)
        const y = Math.pow(normalizedX, 2) * curveHeight;

        // Rotation tilt: left tilted clockwise, right tilted counter-clockwise
        const rotation = -normalizedX * maxRotation;

        // Scale down slightly near the edges
        const scale = 1 - Math.abs(normalizedX) * 0.08;

        // Opacity fadeout at far edges
        const opacity = 1 - Math.pow(Math.abs(normalizedX), 4) * 0.5;

        // Apply styles
        card.style.transform = `translate3d(${relativeX}px, ${y}px, 0) rotate(${rotation}deg) scale(${scale})`;
        card.style.opacity = opacity;
      });

      animationFrameId = requestAnimationFrame(updateCarousel);
    };

    animationFrameId = requestAnimationFrame(updateCarousel);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="hero-carousel" ref={containerRef}>
      {doubleImages.map((img, i) => (
        <div
          key={i}
          className="hero-carousel__card"
          ref={(el) => (cardsRef.current[i] = el)}
        >
          <img src={img.src} alt={img.alt} />
        </div>
      ))}
    </div>
  );
}

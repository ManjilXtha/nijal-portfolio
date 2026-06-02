import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SlidingGallery() {
  const container = useRef(null);
  const slider1 = useRef(null);
  const slider2 = useRef(null);

  useEffect(() => {
    // Basic parallax
    gsap.to(slider1.current, {
      x: '-20%',
      scrollTrigger: {
        trigger: container.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.1,
      },
    });

    gsap.to(slider2.current, {
      x: '20%',
      scrollTrigger: {
        trigger: container.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.1,
      },
    });

    // Scroll Skew Effect
    let proxy = { skew: 0 },
        skewSetter = gsap.quickSetter(container.current, "skewY", "deg"),
        clamp = gsap.utils.clamp(-15, 15);

    ScrollTrigger.create({
      onUpdate: (self) => {
        let skew = clamp(self.getVelocity() / -300);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: "power3",
            overwrite: true,
            onUpdate: () => skewSetter(proxy.skew)
          });
        }
      }
    });

  }, []);

  const items = [
    { title: 'Project 1', color: '#8C8C73' },
    { title: 'Project 2', color: '#EFE8D3' },
    { title: 'Project 3', color: '#706D63' },
    { title: 'Project 4', color: '#C2C2C2' },
  ];

  return (
    <section className="sliding-gallery" ref={container}>
      <div className="sliding-gallery__track" ref={slider1}>
        {[...items, ...items].map((item, i) => (
          <div key={i} className="sliding-gallery__item" style={{ background: item.color }}>
            <span className="sliding-gallery__item-label">{item.title}</span>
          </div>
        ))}
      </div>
      <div className="sliding-gallery__track" ref={slider2} style={{ marginLeft: '-15%' }}>
        {[...items, ...items].map((item, i) => (
          <div key={i} className="sliding-gallery__item" style={{ background: item.color }}>
            <span className="sliding-gallery__item-label">{item.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

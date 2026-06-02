import Hero from '../components/Hero';
import About from '../components/About';
import Works from '../components/Works';
import SlidingGallery from '../components/SlidingGallery';

export default function Home() {
  return (
    <div className="home-page">
      <Hero />
      <About />
      <Works />
      <SlidingGallery />
    </div>
  );
}

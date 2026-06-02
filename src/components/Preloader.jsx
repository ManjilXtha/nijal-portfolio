import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const words = ["Hello", "Namaste", "Bonjour", "Ciao", "Hola", "Konnichiwa", "Nijal"];

const curve = {
  initial: {
    d: "M0 0 L1440 0 L1440 100vh Q720 100vh 0 100vh Z",
  },
  exit: {
    d: "M0 0 L1440 0 L1440 0vh Q720 -100vh 0 0vh Z",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
  }
};

export default function Preloader({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (index === words.length - 1) {
      setTimeout(() => {
        setVisible(false);
        setTimeout(() => onComplete?.(), 1000);
      }, 500);
      return;
    }

    const timeout = setTimeout(() => {
      setIndex(index + 1);
    }, index === 0 ? 1000 : 150);

    return () => clearTimeout(timeout);
  }, [index, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="preloader"
          exit={{ y: "-100vh" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        >
          <div className="preloader__inner">
            <div className="preloader__dot"></div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {words[index]}
            </motion.p>
          </div>
          
          <svg className="preloader__svg">
            <motion.path
              variants={curve}
              initial="initial"
              exit="exit"
              fill="var(--black)"
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

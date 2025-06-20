import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaImages, FaArrowUp } from 'react-icons/fa';
import LiquidLoader from '../animation/LiquidLoader';

import PinterestGrid from '../components/ArtisticGallery';
import AboutMe from './AboutMe';

import BlurText from '../animation/BlurText';
import Button from '../animation/Button';

import image1 from '../assets/intro/1.jpg';
import image2 from '../assets/intro/2.jpg';
import image3 from '../assets/intro/3.jpg';

const heroImages = [image1, image2, image3];

const HolographicButton = ({ children, icon, ...props }) => (
  <motion.button
    {...props}
    className={`relative px-4 sm:px-6 py-2 sm:py-3 md:px-8 md:py-4 font-medium rounded-full overflow-hidden group ${props.className}`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <span className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-md group-hover:bg-opacity-20 transition-all" />
    <span className="absolute inset-0 border-2 border-white border-opacity-30 rounded-full" />
    <span className="relative flex items-center justify-center gap-2 z-10 text-black">
      {icon && <span className="text-sm sm:text-lg">{icon}</span>}
      <span className="text-xs sm:text-sm md:text-base">{children}</span>
    </span>
    <motion.span
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 0.3 }}
      transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
      className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-transparent via-white to-transparent"
    />
  </motion.button>
);

function Home() {
  // --- Loader state ---
  const [loading, setLoading] = useState(true);

  // --- Carousel index ---
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // --- Scroll to top button visibility ---
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // --- Ref for scroll container ---
  const containerRef = useRef(null);

  // Scroll progress hooked to containerRef
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Carousel interval effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Scroll event handler
  const handleScroll = useCallback(() => {
    setShowScrollToTop(window.scrollY > 400);
  }, []);

  // Add/remove scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Hide loader after 1.2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to top function
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // While loading, show the LiquidLoader only
  if (loading) return <LiquidLoader onFinish={() => setLoading(false)} />;

  return (
    <div className="relative min-h-screen overflow-hidden" ref={containerRef}>
      {/* Background Carousel */}
      <motion.div
        className="fixed inset-0 -z-10 h-[70vh] sm:h-full"
        style={{ y }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={heroImages[currentImageIndex]}
              alt="Background"
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.6) contrast(1.2)' }}
              loading="lazy"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Grid Overlay */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4yIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6Ii8+PC9nPjwvZz48L3N2Zz4=')]"/>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center h-[70vh] sm:min-h-screen text-center px-4 pt-20 sm:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex relative mb-4 sm:mb-10 justify-center items-center">
            <BlurText
              text="KABOGRAPHY"
              delay={150}
              animateBy="letters"
              easing="easeInOut"
              direction="top"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center"
            />
            <motion.div
              className="absolute inset-0 bg-white blur-xl opacity-20 pointer-events-none"
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.2 }}
              transition={{ delay: 0.5, duration: 2 }}
            />
          </div>

          <motion.p
            className="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-12 max-w-2xl mx-auto font-bold tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {"REDEFINING VISUAL NARRATIVES".split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.03 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Button
              href="#book"
              icon={<FaArrowRight />}
              className="px-6 py-4 text-base sm:px-6 sm:py-3 sm:text-base"
            >
              Book a Session
            </Button>
            <Button
              href="/gallery"
              icon={<FaImages />}
              className="px-6 py-4 text-base sm:px-6 sm:py-3 sm:text-base"
            >
              Explore Portfolio
            </Button>
          </div>
        </motion.div>

        {/* Carousel Indicators */}
        <motion.div
          className="absolute bottom-4 sm:bottom-10 left-0 right-0 flex justify-center gap-2 sm:gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className="group"
              aria-label={`View slide ${index + 1}`}
            >
              <svg width="30" height="12" viewBox="0 0 30 12" className="sm:w-10">
                <rect
                  x="0" y="0"
                  width="100%" height="2"
                  fill="currentColor"
                  className={`transition-all ${index === currentImageIndex ? 'text-white h-2' : 'text-gray-500 h-1'}`}
                />
                <rect
                  x="0" y="10"
                  width="100%" height="2"
                  fill="currentColor"
                  className={`transition-all ${index === currentImageIndex ? 'text-white h-2' : 'text-gray-500 h-1'}`}
                />
              </svg>
            </button>
          ))}
        </motion.div>

        {/* Scroll Prompt */}
        <motion.div
          className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <div className="animate-bounce flex flex-col items-center">
            <span className="text-xs text-gray-400 mb-1 tracking-widest">SCROLL</span>
            <div className="w-px h-6 sm:h-8 bg-gradient-to-t from-white to-transparent" />
          </div>
        </motion.div>
      </section>

      <AboutMe />
      <PinterestGrid />
      {/* <Footer /> */}

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            key="scrollToTop"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-5 right-5 z-50 bg-white text-black p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
            aria-label="Scroll to top"
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Home;

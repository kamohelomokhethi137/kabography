import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Image1 from '../assets/gallery/1.webp';
import Image2 from '../assets/gallery/2.webp';
import Image3 from '../assets/gallery/3.webp';
import Image4 from '../assets/gallery/4.webp';
import Image5 from '../assets/gallery/5.webp';
import Image6 from '../assets/gallery/6.webp';
import Image7 from '../assets/gallery/7.webp';
import Image8 from '../assets/gallery/8.webp';
import Image9 from '../assets/gallery/9.webp';
import Image10 from '../assets/gallery/10.webp';
import Image11 from '../assets/gallery/11.webp';
import Image12 from '../assets/gallery/12.webp';
import Image13 from '../assets/gallery/13.webp';
import Image14 from '../assets/gallery/14.webp';
import Image15 from '../assets/gallery/15.webp';
import Image16 from '../assets/gallery/16.webp';
import Image17 from '../assets/gallery/17.webp';
import Image18 from '../assets/gallery/18.webp';
import Image19 from '../assets/gallery/19.webp';
import Image20 from '../assets/gallery/20.webp';
import Image21 from '../assets/gallery/21.webp';
import Image23 from '../assets/gallery/23.webp';
import Image24 from '../assets/gallery/24.webp';
import Image25 from '../assets/gallery/25.webp';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const images = [
  { src: Image1, width: 800, height: 1200 },
  { src: Image2, width: 1200, height: 800 },
  { src: Image3, width: 800, height: 1200 },
  { src: Image4, width: 1200, height: 800 },
  { src: Image5, width: 800, height: 1200 },
  { src: Image6, width: 1200, height: 800 },
  { src: Image7, width: 800, height: 1200 },
  { src: Image8, width: 1200, height: 800 },
  { src: Image9, width: 800, height: 1200 },
  { src: Image10, width: 1200, height: 800 },
  { src: Image11, width: 800, height: 1200 },
  { src: Image12, width: 1200, height: 800 },
  { src: Image13, width: 800, height: 1200 },
  { src: Image14, width: 1200, height: 800 },
  { src: Image15, width: 800, height: 1200 },
  { src: Image16, width: 1200, height: 800 },
  { src: Image17, width: 800, height: 1200 },
  { src: Image18, width: 1200, height: 800 },
  { src: Image19, width: 800, height: 1200 },
  { src: Image20, width: 1200, height: 1200 },
  { src: Image21, width: 800, height: 1200 },
  { src: Image23, width: 1200, height: 800 },
  { src: Image24, width: 800, height: 1200 },
  { src: Image25, width: 1200, height: 800 },
];

const ArtisticGallery = () => {
  const galleryRef = useRef(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);
  const [showAllImages, setShowAllImages] = useState(false);

  // Initialize animations when all images load
  useEffect(() => {
    if (loadedCount === images.length) {
      initAnimations();
    }
  }, [loadedCount]);

  const initAnimations = () => {
    const items = gsap.utils.toArray('.gallery-item');
    
    // Staggered entrance animation
    gsap.from(items, {
      y: 80,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: galleryRef.current,
        start: "top 70%",
        toggleActions: "play none none none"
      }
    });

    // Parallax and zoom effects
    items.forEach(item => {
      const img = item.querySelector('img');
      
      // Depth effect on scroll
      gsap.to(img, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Hover zoom
      gsap.to(img, {
        scale: 1.05,
        duration: 0.4,
        paused: true,
        ease: "power2.out"
      });

      item.addEventListener('mouseenter', () => {
        gsap.to(img, { scale: 1.05 }).play();
        setActiveIndex(Number(item.dataset.index));
      });
      
      item.addEventListener('mouseleave', () => {
        gsap.to(img, { scale: 1 }).play();
        setActiveIndex(null);
      });
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  };

  const handleImageLoad = () => {
    setLoadedCount(prev => prev + 1);
  };

  // Dynamic grid layout classes
  const getGridClass = (index) => {
    const patterns = [
      '', 
      'md:col-span-2', 
      'md:row-span-2', 
      'md:col-span-2 md:row-span-2'
    ];
    return patterns[index % patterns.length];
  };

  const handleViewAllClick = () => {
    setShowAllImages(true);
  };

  return (
    <section className="relative py-20 px-4 bg-neutral-950 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]" />
      </div>

      {/* Gallery Grid */}
      <div 
        ref={galleryRef}
        className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[minmax(200px,auto)]"
      >
        {images.slice(0, showAllImages ? images.length : 8).map((img, index) => (
          <motion.div
            key={index}
            data-index={index}
            className={`gallery-item relative overflow-hidden rounded-lg ${getGridClass(index)} ${activeIndex === index ? 'z-10' : 'z-0'}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={img.src}
              alt={`Gallery image ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 will-change-transform"
              loading="lazy"
              decoding="async"
              onLoad={handleImageLoad}
            />

            {/* Artistic overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70 opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
              <motion.h3 
                className="text-white text-xl font-medium"
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                PHOTO {index + 1}
              </motion.h3>
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
              <div className={`absolute inset-0 bg-current opacity-0 transition-opacity duration-500 ${activeIndex === index ? 'opacity-10' : ''}`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* View More Button */}
      {!showAllImages && (
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <button
            onClick={handleViewAllClick}
            className="group relative px-8 py-4 bg-transparent border-2 border-lime-400 text-lime-400 rounded-full overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2 font-medium tracking-wider">
              VIEW ALL IMAGES
              <svg 
                viewBox="0 0 24 24" 
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <motion.span
              className="absolute inset-0 bg-lime-400 z-0"
              initial={{ x: '-100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.6 }}
            />
          </button>
        </motion.div>
      )}
    </section>
  );
};

export default ArtisticGallery;
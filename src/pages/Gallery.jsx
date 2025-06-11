import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import images from '../data/galleryData'; 

gsap.registerPlugin(ScrollTrigger);

const ArtisticGallery = () => {
  const galleryRef = useRef(null);
  const [loaded, setLoaded] = useState(Array(images.length).fill(false));
  const [showAllImages, setShowAllImages] = useState(false);

  useEffect(() => {
    if (loaded.every(Boolean)) {
      initAnimations();
    }
  }, [loaded]);

  const initAnimations = () => {
    const items = gsap.utils.toArray('.gallery-item');

    gsap.from(items, {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.05,
      scrollTrigger: {
        trigger: galleryRef.current,
        start: 'top 80%'
      },
    });

    items.forEach((item) => {
      const img = item.querySelector('img');
      gsap.to(img, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: item,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        },
      });
    });
  };

  const handleImageLoad = (index) => {
    setLoaded((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  const getGridClass = (index) => {
    const patterns = ['', 'md:col-span-2', 'md:row-span-2', 'md:col-span-2 md:row-span-2'];
    return patterns[index % patterns.length];
  };

  return (
    <section className="relative py-20 px-4 bg-black text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
      </div>

      <div
        ref={galleryRef}
        className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[minmax(220px,auto)]"
      >
        {images.slice(0, showAllImages ? images.length : 8).map((img, index) => (
          <motion.div
            key={index}
            className={`gallery-item relative overflow-hidden rounded-xl ${getGridClass(index)} bg-neutral-900`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${loaded[index] ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <div className="relative w-14 h-14">
                <div className="absolute inset-0 border-4 border-lime-400 border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 rounded-full bg-lime-400 opacity-10 blur-xl"></div>
              </div>
            </div>

            <img
              src={img.src}
              alt={`Gallery ${index + 1}`}
              loading="lazy"
              decoding="async"
              fetchpriority={index < 8 ? "high" : "low"}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in ${loaded[index] ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => handleImageLoad(index)}
            />

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70 opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
              <motion.h3
                className="text-white text-sm font-semibold"
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                PHOTO {index + 1}
              </motion.h3>
            </div>
          </motion.div>
        ))}
      </div>

      {!showAllImages && (
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => setShowAllImages(true)}
            className="group relative px-6 py-3 text-lime-400 border-2 border-lime-400 rounded-full overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-1 text-sm font-medium">
              VIEW ALL
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <motion.span
              className="absolute inset-0 bg-lime-400 z-0"
              initial={{ x: '-100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.5 }}
            />
          </button>
        </motion.div>
      )}
    </section>
  );
};

export default ArtisticGallery;
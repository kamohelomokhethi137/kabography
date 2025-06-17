import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import images from '../data/galleryData';

gsap.registerPlugin(ScrollTrigger);

const ArtisticGallery = () => {
  const galleryRef = useRef(null);
  const [loaded, setLoaded] = useState(() => Array(images.length).fill(false));
  const [showAllImages, setShowAllImages] = useState(false);

  const handleImageLoad = useCallback((index) => {
    setLoaded((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }, []);

  useEffect(() => {
    const visibleCount = showAllImages ? images.length : 5;
    if (!loaded.slice(0, visibleCount).every(Boolean)) return;

    const items = gsap.utils.toArray('.gallery-item');

    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    gsap.fromTo(items, 
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: galleryRef.current,
          start: 'top 80%',
        }
      }
    );

    items.forEach(item => {
      const img = item.querySelector('img');
      if (!img) return;

      gsap.to(img, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: item,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    });

    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, [loaded, showAllImages]);

  return (
    <section className="relative py-20 px-4 bg-black text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
      </div>

      <div
        ref={galleryRef}
        className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        {(showAllImages ? images : images.slice(0, 6)).map((img, index) => (
          <motion.div
            key={img.src}
            className="gallery-item relative aspect-[4/3] bg-neutral-900 overflow-hidden rounded-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {!loaded[index] && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
                <div className="w-10 h-10 border-4 border-lime-400 border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            <img
              src={img.src}
              alt={`Photo ${index + 1}`}
              onLoad={() => handleImageLoad(index)}
              className={`w-full h-full object-cover transition-opacity duration-700 ease-in ${loaded[index] ? 'opacity-100' : 'opacity-0'}`}
              loading="lazy"
              decoding="async"
              fetchPriority={index < 5 ? 'high' : 'low'}
              draggable={false}
            />

            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
              <p className="text-sm font-semibold">{index + 1}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {!showAllImages && (
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => setShowAllImages(true)}
            className="relative inline-flex items-center justify-center px-6 py-3 border border-lime-400 text-lime-400 rounded-full text-sm font-medium group overflow-hidden"
          >
            <span className="relative z-10 group-hover:text-black transition-colors">VIEW ALL</span>
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

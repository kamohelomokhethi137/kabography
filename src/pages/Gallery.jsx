import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import images from '../data/galleryData';

const fadeInStyle = {
  opacity: 1,
  transition: 'opacity 0.7s ease-in-out, transform 0.4s ease',
  transform: 'scale(1)',
};

const hiddenStyle = {
  opacity: 0,
  transform: 'scale(0.95)',
};

const ArtisticGallery = () => {
  const [loaded, setLoaded] = useState(() => Array(images.length).fill(false));
  const [visibleCount, setVisibleCount] = useState(6);
  const [modalImage, setModalImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  const [isFiltering, setIsFiltering] = useState(false);

  const itemRefs = useRef([]);

  // Extract unique categories + add 'All'
  const categories = useMemo(() => {
    const cats = Array.from(new Set(images.map(img => img.category))).sort();
    return ['All', ...cats];
  }, []);

  const handleImageLoad = useCallback((index) => {
    setLoaded((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'scale(1)';
          entry.target.style.transition = 'opacity 0.7s ease-in-out, transform 0.4s ease';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    itemRefs.current.forEach((el) => {
      if (el) {
        el.style.opacity = 0;
        el.style.transform = 'scale(0.95)';
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [visibleCount, isFiltering]);

  // Filter images by category
  const filteredImages = useMemo(() => {
    return images.filter(img =>
      selectedCategory === 'All' ? true : img.category === selectedCategory
    );
  }, [selectedCategory]);

  // Sort images by newest/oldest
  const sortedImages = useMemo(() => {
    const copy = [...filteredImages];
    if (sortOrder === 'newest') {
      return copy.reverse();
    }
    return copy;
  }, [filteredImages, sortOrder]);

  const handleViewMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, sortedImages.length));
  };

  const handleCategoryChange = (cat) => {
    setIsFiltering(true);
    setSelectedCategory(cat);
    setVisibleCount(Math.min(6, filteredImages.length));
    setTimeout(() => setIsFiltering(false), 300);
  };

  return (
    <section style={{ backgroundColor: 'black', color: 'white', padding: '5rem 1rem', position: 'relative' }}>
      {/* Background overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: 'radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%)',
        zIndex: 0
      }} />

      {/* Filters + Sort Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          maxWidth: '1200px',
          margin: '0 auto 2rem',
          padding: '0 0.5rem',
          overflowX: 'auto',
          scrollbarWidth: 'thin',
          scrollbarColor: 'white transparent',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Scrollable category filters */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              style={{
                flexShrink: 0,
                padding: '0.6rem 1.4rem',
                borderRadius: '9999px',
                border: '1px solid white',
                background: selectedCategory === cat ? 'white' : 'transparent',
                color: selectedCategory === cat ? 'black' : 'white',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort select */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{
            flexShrink: 0,
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            background: '#1a1a1a',
            color: 'white',
            border: '1px solid white',
            fontWeight: 600,
            cursor: 'pointer',
          }}
          aria-label="Sort images"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* Image grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
        minHeight: '500px'
      }}>
        {sortedImages.slice(0, visibleCount).map((img, index) => {
          const isSelected = modalImage?.src === img.src;
          const originalIndex = images.findIndex(i => i.src === img.src);

          return (
            <div
              key={`${img.src}-${index}`}
              ref={(el) => (itemRefs.current[index] = el)}
              onClick={() => setModalImage(img)}
              style={{
                ...hiddenStyle,
                aspectRatio: '4 / 3',
                borderRadius: '1rem',
                backgroundColor: isSelected ? '#333' : '#1a1a1a',
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
                outline: isSelected ? '3px solid white' : 'none',
                transition: 'all 0.3s ease'
              }}
            >
              {!loaded[originalIndex] && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  zIndex: 10,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    border: '4px solid white',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                </div>
              )}

              <img
                src={img.src}
                alt="Gallery"
                onLoad={() => handleImageLoad(originalIndex)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'opacity 0.7s ease-in',
                  opacity: loaded[originalIndex] ? 1 : 0
                }}
                loading="lazy"
                decoding="async"
                draggable={false}
              />

              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                padding: '1rem',
                background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)'
              }}>
                <p style={{ fontSize: '0.9rem', fontWeight: '600', color: 'white' }}>{img.category}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* View More button */}
      {visibleCount < sortedImages.length && (
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button
            onClick={handleViewMore}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '9999px',
              border: '1px solid white',
              color: 'white',
              background: 'transparent',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              ':hover': {
                background: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            VIEW MORE
          </button>
        </div>
      )}

      {/* Modal preview */}
      {modalImage && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '1rem'
        }}>
          <div style={{
            backgroundColor: 'black',
            borderRadius: '1rem',
            padding: '2rem',
            maxWidth: '800px',
            width: '100%',
            textAlign: 'center',
            border: '1px solid white'
          }}>
            <img
              src={modalImage.src}
              alt="Selected"
              style={{
                maxHeight: '60vh',
                width: '100%',
                objectFit: 'contain',
                borderRadius: '0.75rem',
                marginBottom: '1.5rem',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            />
            <p style={{ fontSize: '1.125rem', fontWeight: '600', color: 'white', marginBottom: '1rem' }}>
              {modalImage.category} Photo
            </p>
            <button
              onClick={() => setModalImage(null)}
              style={{
                padding: '0.5rem 1.5rem',
                backgroundColor: 'white',
                color: 'black',
                borderRadius: '9999px',
                fontWeight: 600,
                cursor: 'pointer',
                border: 'none',
                transition: 'all 0.2s ease',
                ':hover': {
                  opacity: 0.9
                }
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Scrollbar styles for horizontal filter */
        div[style*="overflow-x: auto"]::-webkit-scrollbar {
          height: 6px;
        }
        div[style*="overflow-x: auto"]::-webkit-scrollbar-thumb {
          background-color: white;
          border-radius: 3px;
        }
      `}</style>
    </section>
  );
};

export default ArtisticGallery;
import { useEffect, useRef, useState, useCallback } from 'react';
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
  const itemRefs = useRef([]);

  const handleImageLoad = useCallback((index) => {
    setLoaded((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'scale(1)';
            entry.target.style.transition = 'opacity 0.7s ease-in-out, transform 0.4s ease';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    itemRefs.current.forEach((el) => {
      if (el) {
        el.style.opacity = 0;
        el.style.transform = 'scale(0.95)';
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [visibleCount]);

  const handleViewMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, images.length));
  };

  return (
    <section style={{ backgroundColor: 'black', color: 'white', padding: '5rem 1rem', position: 'relative' }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: 'radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%)',
        zIndex: 0
      }} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {images.slice(0, visibleCount).map((img, index) => {
          const isSelected = modalImage?.src === img.src;

          return (
            <div
              key={img.src}
              ref={(el) => (itemRefs.current[index] = el)}
              onClick={() => setModalImage(img)}
              style={{
                ...hiddenStyle,
                aspectRatio: '4 / 3',
                borderRadius: '1rem',
                backgroundColor: isSelected ? '#2563eb' : '#1a1a1a',
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
                outline: isSelected ? '3px solid #3b82f6' : 'none'
              }}
            >
              {!loaded[index] && (
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
                    border: '4px solid #a3e635',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                </div>
              )}

              <img
                src={img.src}
                alt={`Photo ${index + 1}`}
                onLoad={() => handleImageLoad(index)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'opacity 0.7s ease-in',
                  opacity: loaded[index] ? 1 : 0
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
                <p style={{ fontSize: '0.9rem', fontWeight: '600' }}>{index + 1}</p>
              </div>
            </div>
          );
        })}
      </div>

      {visibleCount < images.length && (
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button
            onClick={handleViewMore}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '9999px',
              border: '1px solid #a3e635',
              color: '#a3e635',
              background: 'transparent',
              fontWeight: 500,
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#000'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            VIEW MORE
          </button>
        </div>
      )}

      {modalImage && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '1rem'
        }}>
          <div style={{
            backgroundColor: '#1a1a1a',
            borderRadius: '1rem',
            padding: '2rem',
            maxWidth: '800px',
            width: '100%',
            textAlign: 'center'
          }}>
            <img
              src={modalImage.src}
              alt="Selected"
              style={{
                maxHeight: '60vh',
                width: '100%',
                objectFit: 'contain',
                borderRadius: '0.75rem',
                marginBottom: '1.5rem'
              }}
            />
            <p style={{ fontSize: '1.125rem', fontWeight: '600', color: 'white', marginBottom: '1rem' }}>Image selected</p>
            <button
              onClick={() => setModalImage(null)}
              style={{
                padding: '0.5rem 1.5rem',
                backgroundColor: '#a3e635',
                color: '#000',
                borderRadius: '9999px',
                fontWeight: 600,
                cursor: 'pointer'
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
      `}</style>
    </section>
  );
};

export default ArtisticGallery;

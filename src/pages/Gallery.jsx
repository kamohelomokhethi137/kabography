import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import images from '../data/galleryData';
import { FaChevronDown, FaChevronUp, FaFilter } from 'react-icons/fa';

const ArtisticGallery = () => {
  const [loaded, setLoaded] = useState(() => Array(images.length).fill(false));
  const [visibleCount, setVisibleCount] = useState(6);
  const [modalImage, setModalImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isFiltering, setIsFiltering] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const itemRefs = useRef([]);
  const dropdownRef = useRef(null);

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

  const filteredImages = useMemo(() => {
    return images.filter(img =>
      selectedCategory === 'All' ? true : img.category === selectedCategory
    );
  }, [selectedCategory]);

  const handleViewMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, filteredImages.length));
  };

  const handleCategoryChange = (cat) => {
    setIsFiltering(true);
    setSelectedCategory(cat);
    setVisibleCount(Math.min(6, filteredImages.length));
    setDropdownOpen(false);
    setTimeout(() => setIsFiltering(false), 300);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const closeOnScroll = () => setDropdownOpen(false);
    window.addEventListener('scroll', closeOnScroll);
    return () => window.removeEventListener('scroll', closeOnScroll);
  }, []);

  return (
    <section className="relative bg-black text-white py-24 px-4 md:px-8 min-h-screen">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] z-0" />

      {/* Desktop Filter Button (top-right, not fixed) */}
      <div className="hidden md:flex justify-end max-w-6xl mx-auto mb-10 px-2">
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setDropdownOpen((open) => !open)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all"
          >
            {selectedCategory}
            {dropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>

          <div
            className={`absolute left-0 mt-2 w-48 rounded-xl bg-[#1a1a1a] border border-white/20 shadow-xl overflow-auto z-[999] transition-all duration-300 ${
              dropdownOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
            }`}
          >
            <ul role="menu">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryChange(cat)}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      selectedCategory === cat
                        ? 'bg-white text-black font-semibold'
                        : 'text-white hover:bg-white/20'
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredImages.slice(0, visibleCount).map((img, index) => {
          const originalIndex = images.findIndex(i => i.src === img.src);

          return (
            <div
              key={`${img.src}-${index}`}
              ref={(el) => (itemRefs.current[index] = el)}
              onClick={() => setModalImage(img)}
              className="aspect-[4/3] bg-[#1a1a1a] rounded-xl overflow-hidden relative cursor-pointer hover:scale-105 transition-transform border border-white/10"
            >
              {!loaded[originalIndex] && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                  <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              <img
                src={img.src}
                alt="Gallery"
                onLoad={() => handleImageLoad(originalIndex)}
                className={`w-full h-full object-cover transition-opacity duration-700 ${
                  loaded[originalIndex] ? 'opacity-100' : 'opacity-0'
                }`}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
              <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-sm font-semibold text-white">{img.category}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* View More */}
      {visibleCount < filteredImages.length && (
        <div className="text-center mt-10">
          <button
            onClick={handleViewMore}
            className="px-6 py-2 rounded-full border border-white text-white font-medium hover:bg-white hover:text-black transition"
          >
            View More
          </button>
        </div>
      )}

      {/* Modal */}
      {modalImage && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="bg-black border border-white p-6 rounded-xl max-w-3xl w-full text-center">
            <img
              src={modalImage.src}
              alt="Preview"
              className="max-h-[60vh] w-full object-contain rounded-lg mb-4"
            />
            <p className="text-lg font-semibold mb-4">{modalImage.category} Photo</p>
            <button
              onClick={() => setModalImage(null)}
              className="px-5 py-2 bg-white text-black rounded-full font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Mobile Filter Button (fixed bottom-right) */}
      <div className="md:hidden fixed bottom-5 right-4 z-[999]">
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setDropdownOpen((open) => !open)}
            className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/20 backdrop-blur-md"
          >
            <FaFilter />
          </button>

          {/* Dropdown opens upward on mobile */}
          <div
            className={`absolute bottom-14 right-0 w-40 rounded-xl bg-[#1a1a1a] border border-white/20 shadow-xl transition-all duration-300 z-[999] ${
              dropdownOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'
            }`}
          >
            <ul role="menu">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryChange(cat)}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      selectedCategory === cat
                        ? 'bg-white text-black font-semibold'
                        : 'text-white hover:bg-white/20'
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtisticGallery;

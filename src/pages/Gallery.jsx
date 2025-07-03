import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import images from '../data/galleryData';
import { FaChevronDown, FaChevronUp, FaFilter, FaTimes } from 'react-icons/fa';

const ArtisticGallery = () => {
  const [loaded, setLoaded] = useState(() => Array(images.length).fill(false));
  const [modalCollection, setModalCollection] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const dropdownRef = useRef(null);
  const modalRef = useRef(null);

  // Check for mobile viewport
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(images.map(img => img.category))).sort();
    return ['All', ...cats];
  }, []);

  // Group images by collection
  const collections = useMemo(() => {
    if (selectedCategory === 'All') {
      const grouped = {};
      images.forEach(img => {
        if (!grouped[img.category]) grouped[img.category] = [];
        grouped[img.category].push(img);
      });
      return grouped;
    } else {
      return {
        [selectedCategory]: images.filter(img => img.category === selectedCategory),
      };
    }
  }, [selectedCategory]);

  // Handle category selection
  const handleCategoryChange = useCallback((cat) => {
    setSelectedCategory(cat);
    setDropdownOpen(false);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle escape key for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && modalCollection) {
        setModalCollection(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalCollection]);

  // Focus trap for modal
  useEffect(() => {
    if (modalCollection && modalRef.current) {
      modalRef.current.focus();
    }
  }, [modalCollection]);

  return (
    <section className="relative bg-black text-white py-12 md:py-24 px-4 md:px-8 min-h-screen">
      {/* Background effect */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] z-0" />

      {/* Header */}
      <header className="max-w-6xl mx-auto mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Artistic Gallery</h1>
        <p className="text-white/70 max-w-2xl">Explore our curated collections of stunning artworks</p>
      </header>

      {/* Filter Dropdown - Mobile */}
      {isMobile && (
        <div className="mb-6">
          <button
            onClick={() => setDropdownOpen(open => !open)}
            className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-base font-medium text-white bg-white/10 border border-white/20"
            aria-expanded={dropdownOpen}
            aria-haspopup="listbox"
            aria-label="Filter by category"
          >
            <span>{selectedCategory}</span>
            <FaFilter className="ml-2" />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <ul 
                  role="listbox"
                  className="mt-2 bg-[#1a1a1a] rounded-lg border border-white/20"
                >
                  {categories.map((cat) => (
                    <motion.li 
                      key={cat}
                      whileTap={{ scale: 0.98 }}
                    >
                      <button
                        onClick={() => handleCategoryChange(cat)}
                        className={`block w-full text-left px-4 py-3 text-base ${
                          selectedCategory === cat 
                            ? 'bg-white text-black font-semibold' 
                            : 'text-white hover:bg-white/10'
                        }`}
                        role="option"
                        aria-selected={selectedCategory === cat}
                      >
                        {cat}
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Filter Dropdown - Desktop */}
      {!isMobile && (
        <div className="flex justify-end max-w-6xl mx-auto mb-10 px-2">
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen(open => !open)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all"
              aria-expanded={dropdownOpen}
              aria-haspopup="listbox"
              aria-label="Filter by category"
            >
              {selectedCategory}
              {dropdownOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-2 w-48 rounded-xl bg-[#1a1a1a] border border-white/20 shadow-xl z-[999]"
                >
                  <ul role="listbox">
                    {categories.map((cat) => (
                      <motion.li 
                        key={cat}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <button
                          onClick={() => handleCategoryChange(cat)}
                          className={`block w-full text-left px-4 py-2 text-sm ${
                            selectedCategory === cat 
                              ? 'bg-white text-black font-semibold' 
                              : 'text-white hover:bg-white/10'
                          }`}
                          role="option"
                          aria-selected={selectedCategory === cat}
                        >
                          {cat}
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Collection Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto z-10 relative">
        {Object.entries(collections).map(([cat, imgs]) => (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -5 }}
            className="bg-[#111] rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all"
          >
            <div
              className="relative aspect-[4/3] overflow-hidden cursor-pointer group"
              onClick={() => setModalCollection({ cat, imgs })}
              role="button"
              tabIndex={0}
              aria-label={`View ${cat} collection`}
            >
              <img
                src={imgs[0].src}
                alt={cat}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4">
                <h2 className="text-xl font-bold mb-1">{cat} Collection</h2>
                <p className="text-sm text-white/80">{imgs.length} artworks</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Collection View */}
      <AnimatePresence>
        {modalCollection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 overflow-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div 
              className="absolute inset-0" 
              onClick={() => setModalCollection(null)}
              aria-label="Close modal"
            />
            
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative bg-black border border-white/20 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto p-6 z-10"
              ref={modalRef}
              tabIndex={-1}
            >
              <button
                onClick={() => setModalCollection(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Close modal"
              >
                <FaTimes />
              </button>

              <h3 id="modal-title" className="text-2xl md:text-3xl font-bold mb-6 pr-8">
                {modalCollection.cat} Collection
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {modalCollection.imgs.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className="group relative aspect-square overflow-hidden rounded-lg border border-white/10 hover:border-white/30 transition-all"
                  >
                    <img
                      src={img.src}
                      alt={`Artwork ${i + 1} from ${modalCollection.cat} collection`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-sm font-medium bg-black/70 px-3 py-1 rounded-full">
                        View Details
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <button
                  onClick={() => setModalCollection(null)}
                  className="px-6 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
                >
                  Close Collection
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ArtisticGallery;
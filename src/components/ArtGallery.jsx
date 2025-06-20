import { FiShoppingCart, FiHeart, FiZoomIn } from 'react-icons/fi';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image1 from '../assets/Art/0.webp';
import Image2 from '../assets/Art/1.webp';
import Image3 from '../assets/Art/2.webp';
import Image4 from '../assets/Art/3.webp';
import Image5 from '../assets/Art/4.webp';
import Image9 from '../assets/Art/9.webp';

const ArtGallery = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [galleryItems, setGalleryItems] = useState([
    {
      id: 1,
      title: 'Ocean Waves',
      image: Image1,
      price: 199,
      category: 'Landscape',
      liked: false,
    },
    {
      id: 2,
      title: 'Urban Dreams',
      image: Image2,
      price: 249,
      category: 'Cityscape',
      liked: false,
    },
    {
      id: 3,
      title: 'Mountain Peak',
      image: Image3,
      price: 179,
      category: 'Nature',
      liked: false,
    },
    {
      id: 4,
      title: 'Abstract Thoughts',
      image: Image4,
      price: 299,
      category: 'Abstract',
      liked: false,
    },
    {
      id: 5,
      title: 'Golden Sunset',
      image: Image5,
      price: 219,
      category: 'Landscape',
      liked: false,
    },
    {
      id: 6,
      title: 'Silhouette',
      image: Image9,
      price: 159,
      category: 'Portrait',
      liked: false,
    },
  ]);

  const toggleLike = (id) => {
    setGalleryItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, liked: !item.liked } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-12">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Art Gallery Wall</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover stunning prints for your home or office. Each piece is crafted with precision and passion.
          </p>
        </div>

        {/* Filter Options */}
        <div className="flex justify-center mb-8 gap-4 flex-wrap">
          <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
            All
          </button>
          <button className="px-4 py-2 border bg-black border-gray-300 rounded-lg hover:bg-gray-800 transition">
            Landscape
          </button>
          <button className="px-4 py-2 border bg-black border-gray-300 rounded-lg hover:bg-gray-800 transition">
            Abstract
          </button>
          <button className="px-4 py-2 border bg-black border-gray-300 rounded-lg hover:bg-gray-800 transition">
            Portrait
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: item.id * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 relative group"
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-64">
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105"
                  initial={{ scale: 1 }}
                  animate={{ scale: hoveredCard === item.id ? 1.05 : 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  loading="lazy"
                  draggable={false}
                />

                {/* Hover Actions */}
                <AnimatePresence>
                  {hoveredCard === item.id && (
                    <motion.div
                      className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/20 backdrop-blur-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.span
                        className="bg-white text-black px-4 py-1 rounded-full text-base font-extrabold shadow-lg select-none"
                        initial={{ scale: 1, color: '#000000', textShadow: '0 0 0 rgba(0,0,0,0)' }}
                        animate={{
                          scale: [1, 1.1, 1],
                          color: ['#000000', '#f59e0b', '#000000'],
                          textShadow: [
                            '0 0 0 rgba(0,0,0,0)',
                            '0 0 8px rgba(245, 158, 11, 0.8)',
                            '0 0 0 rgba(0,0,0,0)',
                          ],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: 'loop',
                          ease: 'easeInOut',
                        }}
                      >
                        ${item.price}
                      </motion.span>
                      <div className="flex gap-4">
                        <button
                          aria-label={`Zoom in on ${item.title}`}
                          className="p-3 bg-white rounded-full shadow hover:scale-110 transition-transform"
                          type="button"
                        >
                          <FiZoomIn size={20} />
                        </button>
                        <button
                          aria-label={`Toggle like on ${item.title}`}
                          className="p-3 bg-white rounded-full shadow hover:scale-110 transition-transform"
                          onClick={() => toggleLike(item.id)}
                          type="button"
                        >
                          <FiHeart
                            size={20}
                            className={item.liked ? 'text-red-500 fill-red-500' : 'text-gray-700'}
                          />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Card Details */}
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">{item.title}</h3>
                    <p className="text-gray-500">{item.category}</p>
                  </div>
                  <span className="font-bold text-lg">${item.price}</span>
                </div>

                <button
                  type="button"
                  className="mt-4 w-full flex items-center justify-center gap-2 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition"
                >
                  <FiShoppingCart />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ArtGallery;

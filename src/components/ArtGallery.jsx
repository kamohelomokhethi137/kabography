import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Image1 from '../assets/Art/0.webp';
import Image2 from '../assets/Art/1.webp';
import Image3 from '../assets/Art/2.webp';
import Image4 from '../assets/Art/3.webp';
import Image5 from '../assets/Art/4.webp';
import Image9 from '../assets/Art/9.webp';

const ArtGallery = () => {
  const [filter, setFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
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

  const filteredItems = galleryItems.filter(item =>
    filter === 'All' ? true : item.category === filter
  );

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

        {/* Category Filter */}
        <div className="flex justify-center mb-8 gap-3 flex-wrap">
          {['All', 'Landscape', 'Cityscape', 'Nature', 'Abstract', 'Portrait'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === cat ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: item.id * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 relative cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              {/* Image */}
              <div className="relative h-64 w-full">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  draggable={false}
                />
              </div>

              {/* Card Details */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-semibold text-green-600">
                      R {item.price}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <button
                    type="button"
                    className="flex items-center gap-2 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition"
                  >
                    <FiShoppingCart />
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    aria-label={`Toggle like on ${item.title}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(item.id);
                    }}
                    className="p-2 rounded-full hover:bg-gray-100 transition"
                  >
                    <FiHeart
                      size={20}
                      className={item.liked ? 'text-red-500 fill-red-500' : 'text-gray-500'}
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Modal Preview */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white rounded-xl shadow-xl relative max-w-md w-full mx-4 overflow-hidden">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl z-10"
              >
                &times;
              </button>
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full object-cover h-80"
              />
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900">{selectedItem.title}</h2>
                <p className="text-gray-500">{selectedItem.category}</p>
                <p className="text-green-600 text-lg font-semibold mt-2">R {selectedItem.price}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArtGallery;

// ArtGallery.jsx
import { FiShoppingCart, FiX, FiFilter } from 'react-icons/fi';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sizeOptions = [
  { label: 'A4', multiplier: 1 },
  { label: 'A3', multiplier: 1.3 },
  { label: 'A2', multiplier: 1.6 },
  { label: 'A1', multiplier: 2 }
];

const allGalleryItems = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Artwork ${i + 1}`,
  image: `/frames/${i + 1}.jpg`,
  price: 199 + (i % 5) * 20,
  category: ['Landscape', 'Portrait', 'Abstract', 'Nature', 'Cityscape'][i % 5]
}));

const ITEMS_PER_PAGE = 9;

const ArtGallery = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const galleryTopRef = useRef(null);
  const categories = ['All', 'Landscape', 'Cityscape', 'Nature', 'Abstract', 'Portrait'];

  const filteredItems = allGalleryItems.filter(item =>
    filter === 'All' ? true : item.category === filter
  );

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getSizeForItem = (id) => selectedSizes[id] || 'A4';

  const getPriceWithSize = (basePrice, sizeLabel) => {
    const sizeObj = sizeOptions.find(s => s.label === sizeLabel);
    return Math.round(basePrice * (sizeObj?.multiplier || 1));
  };

  const addToCart = (item, size) => {
    const cartKey = `${item.id}_${size}`;
    setCartItems(prev => {
      const existing = prev.find(ci => ci.cartKey === cartKey);
      if (existing) {
        return prev.map(ci =>
          ci.cartKey === cartKey ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { ...item, size, price: getPriceWithSize(item.price, size), quantity: 1, cartKey }];
    });
    setShowCart(true);
  };

  const updateQuantity = (cartKey, qty) => {
    if (qty < 1) return;
    setCartItems(prev => prev.map(ci =>
      ci.cartKey === cartKey ? { ...ci, quantity: qty } : ci
    ));
  };

  const removeFromCart = (cartKey) => {
    setCartItems(prev => prev.filter(ci => ci.cartKey !== cartKey));
  };

  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cartItems.reduce((sum, i) => sum + i.quantity * i.price, 0);

  const handlePageChange = (direction) => {
    setCurrentPage(prev => {
      const newPage =
        direction === 'next'
          ? Math.min(prev + 1, totalPages)
          : Math.max(prev - 1, 1);

      setTimeout(() => {
        galleryTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);

      return newPage;
    });
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 text-black">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight">Premium Art Prints</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-2">
          Discover timeless photography framed to perfection. Modern elegance meets curated creativity.
        </p>
      </div>

      {/* Filter Section */}
      <div className="mb-6">
        <div className="sm:hidden flex justify-end mb-2">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            <FiFilter /> Filter
          </button>
        </div>

        <AnimatePresence>
          {filterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="sm:hidden flex flex-col gap-2 mb-4"
            >
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setFilter(cat);
                    setCurrentPage(1);
                    setFilterOpen(false);
                  }}
                  className={`px-4 py-2 rounded ${
                    filter === cat ? 'bg-black text-white' : 'bg-white border text-black'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="hidden sm:flex gap-2 justify-center flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition shadow-sm ${
                filter === cat ? 'bg-black text-white' : 'bg-white border text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div ref={galleryTopRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedItems.map(item => {
          const size = getSizeForItem(item.id);
          const finalPrice = getPriceWithSize(item.price, size);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
            >
              <img src={item.image} alt={item.title} className="w-full h-64 object-cover" />
              <div className="p-5">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.category}</p>

                <div className="mt-3">
                  <label className="text-sm font-medium block mb-1">Size</label>
                  <select
                    className="w-full border rounded px-3 py-2 text-sm"
                    value={size}
                    onChange={(e) =>
                      setSelectedSizes(prev => ({ ...prev, [item.id]: e.target.value }))
                    }
                  >
                    {sizeOptions.map(opt => (
                      <option key={opt.label} value={opt.label}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <p className="mt-2 text-green-600 font-semibold">R {finalPrice}</p>
                <button
                  onClick={() => addToCart(item, size)}
                  className="mt-3 w-full bg-black text-white py-2 rounded hover:bg-gray-800"
                >
                  <FiShoppingCart className="inline mr-2" /> Add to Cart
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="mt-10 flex justify-center gap-4 items-center">
        <button
          onClick={() => handlePageChange('prev')}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-black text-white rounded disabled:opacity-40"
        >
          Previous
        </button>
        <span className="text-sm font-medium">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => handlePageChange('next')}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-black text-white rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>

      {/* Floating Cart Icon */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800"
          >
            <FiShoppingCart size={24} />
            <span className="absolute -top-1 -right-1 bg-red-600 rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          </button>
        </div>
      )}

      {/* Cart Modal */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-20 right-6 w-80 max-h-[70vh] overflow-y-auto bg-white rounded-lg shadow-xl z-50"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Your Cart</h3>
                <button onClick={() => setShowCart(false)} className="text-gray-600 hover:text-black">
                  <FiX />
                </button>
              </div>

              {cartItems.map(item => (
                <div key={item.cartKey} className="flex gap-3 mb-4 items-center">
                  <img src={item.image} alt={item.title} className="w-14 h-14 object-cover rounded" />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.title} ({item.size})</h4>
                    <p className="text-xs">R {item.price}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                        className="px-2 bg-gray-200 rounded"
                      >
                        -
                      </button>
                      <span className="text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                        className="px-2 bg-gray-200 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.cartKey)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <FiX />
                  </button>
                </div>
              ))}

              <div className="border-t pt-3">
                <div className="flex justify-between font-semibold text-sm">
                  <span>Total:</span>
                  <span className="text-green-600">R {totalPrice}</span>
                </div>
                <button className="mt-3 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
                  Checkout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArtGallery;
// ArtGallery.jsx
import { FiShoppingCart, FiX, FiFilter, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sizeOptions = [
  { label: 'A4', multiplier: 1 },
  { label: 'A3', multiplier: 1.3 },
  { label: 'A2', multiplier: 1.6 },
  { label: 'A1', multiplier: 2 }
];

const imageTitles = [
  "Tranquil Horizon",
  "Shepherd's Trail",
  "Misty Morning",
  "Village Life",
  "Golden Valleys",
  "Cultural Colors",
  "Urban Reflections",
  "Highland Spirits",
  "Dusk Over Mountains",
  "Echoes of Silence",
  "Timeless Journey",
  "Waves of Nature",
  "Sunset Solitude",
  "Vivid Memories",
  "Hillside Echo",
  "Pathway of Light",
  "Twilight Markets",
  "Still Waters",
  "Rustic Roads",
  "Majestic Highlands"
];

const allGalleryItems = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: imageTitles[i],
  image: `/frames/${i + 1}.jpg`,
  price: 199 + (i % 5) * 20,
  category: ['Landscape', 'Portrait', 'Abstract', 'Nature', 'Cityscape'][i % 5]
}));

const ArtGallery = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const galleryTopRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  // Handle resize to update isMobile state
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const ITEMS_PER_PAGE = isMobile ? 7 : 9;

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

  const onSelectFilter = (cat) => {
    setFilter(cat);
    setCurrentPage(1);
    setFilterOpen(false);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 text-black">
      <div ref={galleryTopRef} className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight">Framed Photography Collection</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-2">
          Elevate your space with timeless photographic wall art curated from scenic and cultural moments.
        </p>
      </div>

      {/* Filter: desktop buttons, mobile dropdown */}
      <div className="mb-6 flex justify-between items-center">
        {!isMobile && (
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => onSelectFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition border ${
                  filter === cat
                    ? 'bg-black text-white'
                    : 'text-black border-gray-300 hover:bg-black hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {isMobile && (
          <div className="relative">
            <button
              onClick={() => setFilterOpen(prev => !prev)}
              className="flex items-center gap-2 px-4 py-2 border rounded-full text-black bg-white"
              aria-haspopup="listbox"
              aria-expanded={filterOpen}
            >
              <FiFilter size={20} />
              <span>{filter}</span>
              {filterOpen ? <FiChevronUp /> : <FiChevronDown />}
            </button>

            <AnimatePresence>
              {filterOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-50 mt-2 w-40 bg-white border rounded shadow-lg"
                  role="listbox"
                >
                  {categories.map(cat => (
                    <li
                      key={cat}
                      onClick={() => onSelectFilter(cat)}
                      className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                        filter === cat ? 'font-bold bg-gray-200' : ''
                      }`}
                      role="option"
                      aria-selected={filter === cat}
                    >
                      {cat}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Gallery grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedItems.map(item => {
          const size = getSizeForItem(item.id);
          const updatedPrice = getPriceWithSize(item.price, size);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <h2 className="font-semibold text-lg text-black mb-1">{item.title}</h2>
                <p className="text-sm text-gray-600 mb-3">{item.category}</p>
                <select
                  className="w-full border px-3 py-2 text-sm rounded-md mb-2"
                  value={size}
                  onChange={(e) => setSelectedSizes(prev => ({ ...prev, [item.id]: e.target.value }))}
                >
                  {sizeOptions.map(opt => (
                    <option key={opt.label} value={opt.label}>{opt.label}</option>
                  ))}
                </select>
                <p className="text-green-600 font-bold mb-2">R {updatedPrice}</p>
                <button
                  onClick={() => addToCart(item, size)}
                  className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-900 transition"
                >
                  <FiShoppingCart className="inline mr-1" /> Add to Cart
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination below gallery */}
      <div className="flex justify-center gap-4 mt-10">
        <button
          onClick={() => handlePageChange('prev')}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm rounded border bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange('next')}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm rounded border bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      {/* Cart Button */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative bg-black text-white rounded-full p-4 shadow-lg hover:bg-gray-800 transition"
            aria-label="Toggle cart"
          >
            <FiShoppingCart size={24} />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
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
            className="fixed bottom-20 right-6 w-80 max-h-[70vh] overflow-y-auto bg-white shadow-2xl rounded-lg z-50 text-black"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-xl">Your Cart</h3>
                <button onClick={() => setShowCart(false)} className="text-gray-500 hover:text-black" aria-label="Close cart">
                  <FiX size={20} />
                </button>
              </div>
              {cartItems.map(item => (
                <div key={item.cartKey} className="flex items-center gap-4 mb-4">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{item.title} ({item.size})</h4>
                    <p className="text-xs">R {item.price}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                        className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                        aria-label={`Decrease quantity of ${item.title}`}
                      >-</button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                        className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                        aria-label={`Increase quantity of ${item.title}`}
                      >+</button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.cartKey)}
                    className="text-gray-400 hover:text-red-600"
                    aria-label={`Remove ${item.title} from cart`}
                  >
                    <FiX />
                  </button>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span className="text-green-600">R {totalPrice}</span>
                </div>
                <button className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
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

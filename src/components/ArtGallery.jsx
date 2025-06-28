import { FiShoppingCart, FiX, FiFilter } from 'react-icons/fi';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Image1 from '../assets/Art/0.webp';
import Image2 from '../assets/Art/1.webp';
import Image3 from '../assets/Art/2.webp';
import Image4 from '../assets/Art/3.webp';
import Image5 from '../assets/Art/4.webp';
import Image9 from '../assets/Art/9.webp';

const sizeOptions = [
  { label: 'A4', multiplier: 1 },
  { label: 'A3', multiplier: 1.3 },
  { label: 'A2', multiplier: 1.6 },
  { label: 'A1', multiplier: 2 }
];

const ArtGallery = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState({});

  const categories = ['All', 'Landscape', 'Cityscape', 'Nature', 'Abstract', 'Portrait'];

  const galleryItems = [
    { id: 1, title: 'Lesotho Shepherds', image: Image1, price: 199, category: 'Landscape' },
    { id: 2, title: 'Maseru city & canyons', image: Image2, price: 249, category: 'Cityscape' },
    { id: 3, title: 'Lesotho Group frames', image: Image3, price: 179, category: 'Nature' },
    { id: 4, title: 'Qiloane & Mohale Dam', image: Image4, price: 299, category: 'Abstract' },
    { id: 5, title: 'Lesotho animals', image: Image5, price: 219, category: 'Landscape' },
    { id: 6, title: 'Lesotho Shepherds', image: Image9, price: 159, category: 'Portrait' }
  ];

  const filteredItems = galleryItems.filter(item => filter === 'All' || item.category === filter);

  const getSizeForItem = (id) => selectedSizes[id] || 'A4';

  const getPriceWithSize = (basePrice, sizeLabel) => {
    const sizeObj = sizeOptions.find(s => s.label === sizeLabel);
    return Math.round(basePrice * (sizeObj?.multiplier || 1));
  };

  const addToCart = (item, size) => {
    const cartKey = `${item.id}_${size}`;
    setCartItems(prevItems => {
      const existing = prevItems.find(ci => ci.cartKey === cartKey);
      if (existing) {
        return prevItems.map(ci => ci.cartKey === cartKey ? { ...ci, quantity: ci.quantity + 1 } : ci);
      }
      return [...prevItems, { ...item, size, price: getPriceWithSize(item.price, size), quantity: 1, cartKey }];
    });
    setShowCart(true);
  };

  const removeFromCart = (cartKey) => {
    setCartItems(prev => prev.filter(i => i.cartKey !== cartKey));
  };

  const updateQuantity = (cartKey, qty) => {
    if (qty < 1) return;
    setCartItems(prev => prev.map(i => i.cartKey === cartKey ? { ...i, quantity: qty } : i));
  };

  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 text-black">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-black">Art Gallery Wall</h1>
        <p className="text-lg text-black max-w-2xl mx-auto">Discover stunning prints for your home or office. Each piece is crafted with precision and passion.</p>
      </div>

      {/* Filter Section */}
      <div className="mb-6">
        {/* Mobile Filter Toggle */}
        <div className="sm:hidden flex justify-end mb-2">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-black text-white hover:bg-gray-800 transition"
            aria-label="Toggle filter options"
          >
            <FiFilter /> Filter
          </button>
        </div>

        {/* Mobile Filter Options */}
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
                    setFilterOpen(false);
                  }}
                  className={`px-4 py-2 text-sm rounded-md transition font-medium hover:bg-black hover:text-white ${
                    filter === cat ? 'bg-black text-white' : 'bg-white text-black border'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Filter Options */}
        <div className="hidden sm:flex flex-wrap gap-2 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 text-sm rounded-full transition font-medium shadow-sm hover:bg-black hover:text-white ${
                filter === cat ? 'bg-black text-white' : 'bg-white text-black border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map(item => {
          const size = getSizeForItem(item.id);
          const updatedPrice = getPriceWithSize(item.price, size);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl overflow-hidden shadow-md text-black"
            >
              <img src={item.image} alt={item.title} className="w-full h-64 object-cover" loading="lazy" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-black">{item.title}</h3>
                <p className="text-sm text-black">{item.category}</p>

                <div className="mt-3 text-black">
                  <label
                    htmlFor={`size-select-${item.id}`}
                    className="block text-sm font-medium text-black mb-1"
                  >
                    Select Size:
                  </label>
                  <select
                    id={`size-select-${item.id}`}
                    className="
                      w-full
                      border
                      rounded-md
                      px-4
                      py-3
                      text-sm
                      text-black
                      appearance-none
                      bg-white
                      bg-[url('data:image/svg+xml;utf8,<svg fill=%22%23000%22 height=%2212%22 viewBox=%220 0 24 24%22 width=%2212%22 xmlns=%22http://www.w3.org/2000/svg%22><path d=%22M7 10l5 5 5-5z%22/></svg>')]
                      bg-no-repeat
                      bg-right-3
                      bg-center
                      focus:outline-none
                      focus:ring-2
                      focus:ring-black
                      focus:ring-opacity-50
                      transition
                    "
                    value={size}
                    onChange={(e) => setSelectedSizes(prev => ({ ...prev, [item.id]: e.target.value }))}
                    aria-label={`Select size for ${item.title}`}
                  >
                    {sizeOptions.map(opt => (
                      <option key={opt.label} value={opt.label}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <p className="mt-2 text-green-600 font-semibold">R {updatedPrice}</p>
                <button
                  className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition shadow-md hover:shadow-lg"
                  onClick={() => addToCart(item, size)}
                  aria-label={`Add ${item.title} size ${size} to cart`}
                >
                  <FiShoppingCart className="inline-block mr-2" /> Add to Cart
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Cart Button */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative bg-black text-white rounded-full p-4 shadow-lg hover:bg-gray-800 transition"
            aria-label="Toggle shopping cart"
          >
            <FiShoppingCart size={24} />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center select-none">
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
                <h3 className="font-bold text-xl text-black">Your Cart</h3>
                <button onClick={() => setShowCart(false)} className="text-gray-500 hover:text-black" aria-label="Close cart">
                  <FiX size={20} />
                </button>
              </div>

              {cartItems.map(item => (
                <div key={item.cartKey} className="flex items-center gap-4 mb-4">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-black">{item.title} ({item.size})</h4>
                    <p className="text-xs text-black">R {item.price}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                        className="px-2 bg-gray-200 rounded text-black hover:bg-gray-300 transition"
                        aria-label={`Decrease quantity of ${item.title} size ${item.size}`}
                      >
                        -
                      </button>
                      <span className="text-sm text-black select-none">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                        className="px-2 bg-gray-200 rounded text-black hover:bg-gray-300 transition"
                        aria-label={`Increase quantity of ${item.title} size ${item.size}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.cartKey)}
                    className="text-gray-400 hover:text-red-600"
                    aria-label={`Remove ${item.title} size ${item.size} from cart`}
                  >
                    <FiX />
                  </button>
                </div>
              ))}

              <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-sm text-black">
                  <span>Total:</span>
                  <span className="text-green-600">R {totalPrice}</span>
                </div>
                <button
                  className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition text-sm shadow-md hover:shadow-lg"
                  aria-label="Proceed to checkout"
                >
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

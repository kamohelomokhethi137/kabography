import { FiShoppingCart, FiHeart, FiX, FiFilter } from 'react-icons/fi';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Image1 from '../assets/Art/0.webp';
import Image2 from '../assets/Art/1.webp';
import Image3 from '../assets/Art/2.webp';
import Image4 from '../assets/Art/3.webp';
import Image5 from '../assets/Art/4.webp';
import Image9 from '../assets/Art/9.webp';

const ArtGallery = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const categories = ['All', 'Landscape', 'Cityscape', 'Nature', 'Abstract', 'Portrait'];

  const [galleryItems, setGalleryItems] = useState([
    { id: 1, title: 'Lesotho Shepherds', image: Image1, price: 199, category: 'Landscape', liked: false },
    { id: 2, title: 'Maseru city & canyons', image: Image2, price: 249, category: 'Cityscape', liked: false },
    { id: 3, title: 'Lesotho Group frames', image: Image3, price: 179, category: 'Nature', liked: false },
    { id: 4, title: 'Qiloane & Mohale Dam', image: Image4, price: 299, category: 'Abstract', liked: false },
    { id: 5, title: 'Lesotho animals', image: Image5, price: 219, category: 'Landscape', liked: false },
    { id: 6, title: 'Lesotho Shepherds', image: Image9, price: 159, category: 'Portrait', liked: false },
  ]);

  const filteredItems = galleryItems.filter(item => filter === 'All' || item.category === filter);

  const toggleLike = (id) => {
    setGalleryItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, liked: !item.liked } : item))
    );
  };

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
    setShowCart(true);
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map(item => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen relative bg-gray-50 rounded-4xl">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Art Gallery Wall</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover stunning prints for your home or office. Each piece is crafted with precision and passion.
          </p>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <h2 className="lg:text-xl lg:font-semibold lg:text-gray-800 hidden sm:block">Filter By Category</h2>
          <div className="sm:hidden">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-black text-white hover:bg-gray-800 transition"
            >
              <FiFilter /> 
            </button>
          </div>

          <div className="hidden sm:flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 text-sm rounded-full transition font-medium shadow-sm hover:bg-black hover:text-white ${
                  filter === cat ? 'bg-black text-white' : 'bg-white text-gray-700 border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {filterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-col sm:hidden gap-2 mb-6"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setFilter(cat);
                    setFilterOpen(false);
                  }}
                  className={`px-4 py-2 text-sm rounded-md transition font-medium hover:bg-black hover:text-white ${
                    filter === cat ? 'bg-black text-white' : 'bg-white text-gray-700 border'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

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
              <div className="relative h-64 w-full">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy" draggable={false} />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-semibold text-green-600">R {item.price}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item);
                    }}
                    className="flex items-center gap-2 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition"
                  >
                    <FiShoppingCart /> Add to Cart
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
                    <FiHeart size={20} className={item.liked ? 'text-red-500 fill-red-500' : 'text-gray-500'} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Floating Cart Icon */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative bg-black text-white rounded-full p-4 shadow-lg hover:bg-gray-800 transition"
          >
            <FiShoppingCart size={24} />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          </button>
        </div>
      )}

      {/* Cart Panel */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-20 text-black right-6 w-80 max-h-[70vh] overflow-y-auto bg-white shadow-2xl rounded-lg z-50"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-xl">Your Cart</h3>
                <button onClick={() => setShowCart(false)} className="text-gray-500 hover:text-black">
                  <FiX size={20} />
                </button>
              </div>
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 mb-4">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.title}</h4>
                    <p className="text-xs text-gray-500">R {item.price}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 bg-gray-200 rounded">-</button>
                      <span className="text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 bg-gray-200 rounded">+</button>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-600">
                    <FiX />
                  </button>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-sm">
                  <span>Total:</span>
                  <span>R {totalPrice}</span>
                </div>
                <button className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition text-sm">
                  Checkout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Preview Modal */}
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
                <button
                  onClick={() => {
                    addToCart(selectedItem);
                    setSelectedItem(null);
                  }}
                  className="w-full bg-black text-white py-2 px-4 rounded-lg mt-4 hover:bg-gray-800 transition"
                >
                  Add to Cart
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

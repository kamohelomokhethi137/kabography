import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiHome,
  FiImage,
  FiCamera,
  FiCalendar,
  FiUser,
  FiMail,
} from "react-icons/fi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        when: "afterChildren",
      },
    },
  };

  const linkVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300 },
    },
    closed: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 },
    },
  };

  const navItems = [
    { name: "Home", icon: <FiHome /> },
    { name: "Gallery", icon: <FiImage /> },
    { name: "Services", icon: <FiCamera /> },
    { name: "Book", icon: <FiCalendar /> },
    { name: "About", icon: <FiUser /> },
    { name: "Contact", icon: <FiMail /> },
  ];

  return (
    <nav className="fixed w-full z-50 text-white">
     
      {/* Glass Dark Background */}
      
      <div className="absolute inset-0 backdrop-blur-md bg-black/70 border-b border-white/10" />

      <div className="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between md:justify-center">
       
        {/* Mobile Logo */}

        <div className="block md:hidden text-2xl"
         style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          Kabography
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-20">
          <div className="flex gap-10">
            {navItems.slice(0, 3).map((item) => (
              <a
                key={item.name}
                href={`#${item.name.toLowerCase()}`}
                className="flex items-center gap-2 hover:text-gray-300 transition"
              >
                {item.icon}
                <span>{item.name}</span>
              </a>
            ))}
          </div>

          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold "
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Kabography
          </motion.div>

          <div className="flex gap-10">
            {navItems.slice(3).map((item) => (
              <a
                key={item.name}
                href={`#${item.name.toLowerCase()}`}
                className="flex items-center gap-2 hover:text-gray-300 transition"
              >
                {item.icon}
                <span>{item.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden z-50">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Items */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-md px-6 py-4 flex flex-col gap-4 md:hidden"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={`#${item.name.toLowerCase()}`}
                  className="flex items-center gap-2 text-white hover:text-gray-300 transition"
                  variants={linkVariants}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;

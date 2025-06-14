import { useState, useEffect } from "react";
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
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Scroll direction detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false); // Scroll down = hide
      } else {
        setShowNavbar(true); // Scroll up = show
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const menuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.05,
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
      transition: { type: "tween", duration: 0.2 },
    },
    closed: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.15 },
    },
  };

  const navItems = [
    { name: "Home", icon: <FiHome />, path: "/home" },
    { name: "Gallery", icon: <FiImage />, path: "/gallery" },
    { name: "Services", icon: <FiCamera />, path: "/services" },
    { name: "Book", icon: <FiCalendar />, path: "/book" },
    { name: "About", icon: <FiUser />, path: "#about" },
    { name: "Contact", icon: <FiMail />, path: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: showNavbar ? 0 : "-100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed w-full z-50 text-white"
    >
      {/* Glass Dark Background */}
      <div className="absolute inset-0 backdrop-blur-md bg-black/70 border-b border-white/10" />

      <div className="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between md:justify-center">
        {/* Mobile Logo */}
        <div
          className="block md:hidden text-2xl"
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
                href={item.path}
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
            className="text-2xl font-bold"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Kabography
          </motion.div>

          <div className="flex gap-10">
            {navItems.slice(3).map((item) => (
              <a
                key={item.name}
                href={item.path}
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
                  href={item.path}
                  className="flex items-center gap-2 text-white hover:text-gray-300 transition"
                  variants={linkVariants}
                  onClick={() => setIsMenuOpen(false)} // close menu on click
                >
                  {item.icon}
                  <span>{item.name}</span>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;

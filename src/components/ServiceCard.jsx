import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; 

const particles = new Array(18).fill(0);

const ServiceCard = ({ icon, title, description, link }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/50 p-6 shadow-md backdrop-blur-md transition duration-300 hover:shadow-xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Floating particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {particles.map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/10 rounded-full"
            style={{
              width: `${Math.random() * 6 + 4}px`,
              height: `${Math.random() * 6 + 4}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, Math.random() * 20 - 10],
              x: [0, Math.random() * 10 - 5],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: Math.random() * 10 + 6,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* Foreground content */}
      <div className="relative z-10">
        <div className="mb-4 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/20 backdrop-blur-sm">
          {icon}
        </div>

        <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
        <p className="text-sm text-white/70 mb-5 leading-relaxed">{description}</p>

        <Link to={link}>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="relative px-5 py-2 text-sm text-white rounded-full border border-white/20 overflow-hidden group transition-all duration-300"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-white/5 group-hover:opacity-20 transition duration-300" />
            <motion.span
              className="absolute bottom-0 left-0 h-0.5 bg-white w-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
              layoutId="underline"
            />
            <span className="relative z-10">Learn More</span>
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCard;

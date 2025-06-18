import { motion } from 'framer-motion';
import { useState } from 'react';

const ServiceCard = ({ icon, title, description }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative group overflow-hidden rounded-2xl border border-white/10 bg-black/50 p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Particle Background */}
      <div className="absolute inset-0 z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/10 rounded-full"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              scale: Math.random() * 0.6 + 0.4
            }}
            animate={{
              y: [null, Math.random() * 20 - 10 + '%'],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
            style={{ width: 8, height: 8 }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="mb-4 w-12 h-12 rounded-full flex items-center justify-center border border-white/20 bg-white/5 backdrop-blur-sm">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
        <p className="text-sm text-white/70 mb-4 leading-relaxed">{description}</p>
        <button className="relative inline-block px-5 py-2 border border-white/20 rounded-full text-white text-sm overflow-hidden group">
          <span className="absolute inset-0 bg-white/10 group-hover:scale-110 transition-transform duration-300" />
          <span className="relative z-10">Learn More</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
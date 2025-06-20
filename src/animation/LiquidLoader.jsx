import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const WatercolorLoader = ({ onFinish }) => {
  const [visible, setVisible] = useState(true);
  const colors = ['#4f46e5', '#ec4899', '#10b981', '#f59e0b'];

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onFinish?.();
    }, 1500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  const blobVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: [0.2, 0.8, 0.2],
      scale: [1, 1.3, 1],
      x: [0, Math.random() * 40 - 20, 0],
      y: [0, Math.random() * 40 - 20, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatDelay: 0.5,
        delay: i * 0.3,
        ease: "easeInOut"
      }
    })
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-64 h-64">
            {/* Watercolor blobs */}
            {colors.map((color, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={blobVariants}
                className="absolute rounded-full mix-blend-multiply"
                style={{
                  backgroundColor: color,
                  width: `${Math.random() * 100 + 100}px`,
                  height: `${Math.random() * 100 + 100}px`,
                  filter: 'blur(30px)',
                  left: `${Math.random() * 50}%`,
                  top: `${Math.random() * 50}%`
                }}
              />
            ))}

            {/* Text animation */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0.9, 1.1, 0.9]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <h1 className="text-4xl font-bold text-white tracking-wider">
                KABOGRAPHY
              </h1>
            </motion.div>

            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 border-4 border-white rounded-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [0.8, 1.5],
                opacity: [0, 0.5, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WatercolorLoader;
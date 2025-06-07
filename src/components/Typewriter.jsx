import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Typewriter = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  const text = "The site you visited is under construction";
  const cursorVariants = {
    blinking: {
      opacity: [0, 1, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatDelay: 0
      }
    }
  };

  const progressVariants = {
    initial: { scaleX: 0 },
    animate: { 
      scaleX: 1,
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut"
      }
    }
  };

  useEffect(() => {
    if (!isDeleting && currentIndex < text.length) {
      // Typing forward
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timeout);
    } else if (isDeleting && currentIndex > 0) {
      // Deleting
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1));
        setCurrentIndex(prev => prev - 1);
        setTypingSpeed(50); // Faster when deleting
      }, typingSpeed);

      return () => clearTimeout(timeout);
    } else if (currentIndex === text.length) {
      // Pause at end of typing
      const pauseTimeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);

      return () => clearTimeout(pauseTimeout);
    } else if (currentIndex === 0 && isDeleting) {
      // Reset after deleting
      setIsDeleting(false);
      setTypingSpeed(150);
    }
  }, [currentIndex, isDeleting, text, typingSpeed]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black flex items-center justify-center p-8"
    >
      <div className="max-w-2xl w-full">
        <div className="relative">
          <motion.h1 
            className="text-white text-4xl md:text-5xl font-mono font-bold mb-6"
          >
            {displayText}
            <motion.span
              variants={cursorVariants}
              animate="blinking"
              className="inline-block w-2 h-12 bg-white align-middle ml-1"
            />
          </motion.h1>
          
          <motion.div 
            variants={progressVariants}
            initial="initial"
            animate="animate"
            className="absolute bottom-0 left-0 w-full h-1 bg-white origin-left"
          />
        </div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="text-gray-400 font-mono mt-8 text-lg"
        >
          Please check back soon for updates...
        </motion.p>
        
        <motion.div 
          className="mt-12 flex space-x-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-4 h-4 rounded-full bg-white opacity-20"
              animate={{
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                delay: i * 0.3
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Typewriter;
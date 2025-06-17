import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AboutImage from '../assets/about/about.jpg';

const AboutMe = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);
  const underlineScale = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // Parallax effect: image scrolls slower than text
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

  const paragraphs = [
    "Kabography was founded by Kabelo Ramatseliso, whose passion for storytelling through photography sparked the creation of a brand focused on capturing life's special moments with creativity and care.",
    "Later, Mabontle Ramatseliso joined as a supportive partner, adding strength and shared vision to the business. Together, they form a dedicated team committed to quality and customer satisfaction.",
    "We specialize in professional photography and videography services for all occasions—whether personal or business-related—ensuring every moment is beautifully preserved.",
    "To complement our services, we also offer high-quality frames and canvas prints, perfect for displaying your memories at home or in the workplace"
  ];

  //  console.log('ref.current:', ref.current);
  return (
    <section
      ref={ref}
      id="about"
      className="relative py-20 px-4 sm:px-8 md:px-12 lg:px-20 bg-black overflow-hidden">

     
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* TEXT COLUMN */}
        <div className="relative z-10 space-y-8">
          <div className="relative inline-block">
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold"
              style={{ opacity }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">
                About Us
              </span>
            </motion.h2>
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-white origin-left"
              style={{
                width: '100%',
                scaleX: underlineScale,
              }}
            />
          </div>

          <div className="space-y-6">
            {paragraphs.map((text, index) => {
              const lineProgress = useTransform(
                scrollYProgress,
                [0.1 + index * 0.15, 0.3 + index * 0.15],
                [0, 1]
              );

              return (
                <motion.p
                  key={index}
                  className="text-lg sm:text-xl text-gray-400 leading-relaxed"
                  style={{
                    opacity: lineProgress,
                    color: useTransform(lineProgress, [0, 1], ["#9ca3af", "#ffffff"])
                  }}
                >
                  {text}
                </motion.p>
              );
            })}
          </div>
        </div>

        {/* IMAGE COLUMN with slower scroll effect */}
        <motion.div
          className="relative aspect-square w-full h-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl group"
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
          style={{ y: imageY }}
        >
          {/* Image with hover zoom */}
          <motion.img
            src={AboutImage}
            alt="kabography"
            className="w-full h-full object-cover rounded-2xl transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
            style={{ willChange: 'transform, opacity' }}
          />

          {/* Soft overlay that animates on scroll */}
          <motion.div
            className="absolute inset-0 bg-white/10 backdrop-blur-sm pointer-events-none"
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.5], [0, 0.2])
            }}
          />

          {/* Light border glow animation */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/30 transition duration-500 pointer-events-none z-10"
            style={{
              boxShadow: '0 0 20px 4px rgba(255,255,255,0.05)',
              opacity: useTransform(scrollYProgress, [0, 1], [0, 0.3])
            }}
          />
        </motion.div>

      </div>

      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.5], [0, 0.2]),
          scaleX: useTransform(scrollYProgress, [0, 1], [0.5, 1])
        }}
      />
    </section>
    
  );
};

export default AboutMe;

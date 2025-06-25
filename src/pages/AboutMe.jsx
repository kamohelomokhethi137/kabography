import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AboutImage from '../assets/about/about.jpg';

const AboutMe = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

  // Heading animation
  const headingY = useTransform(scrollYProgress, [0, 0.3], [30, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const headingScale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1]);

  const paragraphs = [
    "Kabography was founded by Kabelo Ramatseliso, whose passion for storytelling through photography sparked the creation of a brand focused on capturing life's special moments with creativity and care.",
    "Later, Mabontle Ramatseliso joined as a supportive partner, adding strength and shared vision to the business. Together, they form a dedicated team committed to quality and customer satisfaction.",
    "We specialize in professional photography and videography services for all occasions—whether personal or business-related—ensuring every moment is beautifully preserved.",
    "To complement our services, we also offer high-quality frames and canvas prints, perfect for displaying your memories at home or in the workplace.",
  ];

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-28 px-6 sm:px-12 md:px-20 lg:px-32 bg-black text-white overflow-hidden"
    >
      {/* Subtle Grid Overlay */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0, 0.08]) }}
      >
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M20 0H0V20" stroke="#ffffff0c" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </motion.div>

      {/* Fading BG */}
      <motion.div
        className="absolute inset-0 z-0 bg-black"
        style={{ opacity: bgOpacity }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
        {/* TEXT */}
        <div className="space-y-12">
          {/* Animated Heading + Underline */}
          <motion.div
            className="relative w-fit"
            style={{
              y: headingY,
              opacity: headingOpacity,
              scale: headingScale,
            }}
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-wide">
              About Us
            </h2>
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-white origin-left"
              style={{
                width: '100%',
                scaleX: useTransform(scrollYProgress, [0, 0.3], [0, 1]),
              }}
            />
          </motion.div>

          {/* Parallax Paragraphs */}
          <div className="space-y-8 text-lg sm:text-xl leading-relaxed">
            {paragraphs.map((text, index) => {
              const opacity = useTransform(scrollYProgress, [0.1 + index * 0.1, 0.4 + index * 0.1], [0, 1]);
              const translateY = useTransform(scrollYProgress, [0, 1], [20 + index * 10, 0]);

              return (
                <motion.p
                  key={index}
                  className="text-gray-300"
                  style={{ opacity, y: translateY }}
                >
                  {text}
                </motion.p>
              );
            })}
          </div>
        </div>

        {/* IMAGE */}
        <motion.div
          className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(255,255,255,0.08)] border border-white/10 group"
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
          style={{ y: imageY }}
        >
          <img
            src={AboutImage}
            alt="kabography"
            className="w-full h-full object-cover rounded-3xl transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />

          <motion.div
            className="absolute inset-0 bg-white/10 backdrop-blur-sm pointer-events-none"
            style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0, 0.15]) }}
          />

          <motion.div
            className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/30 transition duration-500 pointer-events-none z-10"
            style={{
              boxShadow: '0 0 20px 4px rgba(255,255,255,0.05)',
              opacity: useTransform(scrollYProgress, [0, 1], [0, 0.3])
            }}
          />
        </motion.div>
      </div>

      {/* Accent Top Bar */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.5], [0, 0.2]),
          scaleX: useTransform(scrollYProgress, [0, 1], [0.5, 1]),
        }}
      />
    </section>
  );
};

export default AboutMe;

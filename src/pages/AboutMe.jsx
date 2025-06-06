import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AboutImage from '../assets/about/about.jpg';

const AboutMe = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Animation values
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const underlineScale = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // Text content
  const paragraphs = [
    "Kabography was founded by Kabelo Ramatseliso, whose passion for storytelling through photography sparked the creation of a brand focused on capturing life's special moments with creativity and care.",
    "Later, Mabontle Ramatseliso joined as a supportive partner, adding strength and shared vision to the business. Together, they form a dedicated team committed to quality and customer satisfaction.",
    "We specialize in professional photography and videography services for all occasions—whether personal or business-related—ensuring every moment is beautifully preserved.",
    "To complement our services, we also offer high-quality frames and canvas prints, perfect for displaying your memories at home or in the workplace"
  ];

  return (
    <section 
      ref={ref}
      className="relative py-20 px-4 sm:px-8 md:px-12 lg:px-20 bg-black overflow-hidden"
      id="about"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="space-y-8">
          <div className="relative inline-block">
            <motion.h2 
              className="text-4xl sm:text-5xl md:text-6xl font-bold relative inline-block"
              style={{ opacity }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">
                About Us
              </span>
            </motion.h2>
            
            {/* Animated Underline - Confined to text width */}
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
                    color: useTransform(
                      lineProgress,
                      [0, 1],
                      ["#9ca3af", "#ffffff"]
                    )
                  }}
                >
                  {text}
                </motion.p>
              );
            })}
          </div>
        </div>

        <motion.div 
          className="relative aspect-square w-full h-auto rounded-2xl overflow-hidden border-2 border-white/10"
          style={{ y }}
        >
          <img 
            src={AboutImage}  
            alt="kabography" 
            className="w-full h-full object-cover"
          />
          <motion.div 
            className="absolute inset-0 bg-white/10 backdrop-blur-sm"
            style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0.5, 0]) }}
          />
        </motion.div>
      </div>

      {/* Decorative elements */}
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
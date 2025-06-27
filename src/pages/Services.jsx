// import Footer from '../components/Footer';
import { FiCamera, FiEdit, FiImage, FiLayout } from 'react-icons/fi';
import ServiceCard from '../components/ServiceCard';
import TrueFocus from '../components/TrueFocus';
import React, { useRef } from 'react';

const services = [
  {
    title: 'Photography',
    icon: <FiCamera size={26} />,
    description:
      'Capture unforgettable moments with professional photography tailored for events, portraits, and lifestyle shoots.',
  },
  {
    title: 'Photo Editing',
    icon: <FiEdit size={26} />,
    description:
      'Transform your photos with expert retouching, color correction, and artistic enhancements.',
      
  },
  {
    title: 'Prints for Sale',
    icon: <FiImage size={26} />,
    description:
      'Buy high-quality photo prints in various styles and formats — perfect for your home or office.',
  },
  {
    title: 'Art Gallery Wall Design',
    icon: <FiLayout size={26} />,
    description:
      'We help you design stunning gallery walls using curated photography, thoughtful layout planning, and expert visual storytelling.',
    link: '/shop',
  }
];

const Services = () => {
  return (
    <div>
      <section className="min-h-screen px-6 py-24 bg-black text-white">
        <div className="max-w-6xl mx-auto">

          <div className="mb-16">
            <TrueFocus
              sentence="Our Services"
              manualMode={false}
              blurAmount={3}
              borderColor="Gray"
              animationDuration={1.5}
              pauseBetweenAnimations={1}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <AnimatedCard key={index}>
                <ServiceCard {...service} />
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );

  // AnimatedCard component
  function AnimatedCard({ children }) {
    const dotRef = useRef(null);
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x - 6}px, ${y - 6}px)`;
      }
    };

    const handleMouseLeave = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(-9999px, -9999px)`;
      }
    };

    return (
      <div
        ref={cardRef}
        className="bg-gray-900 rounded-xl transition-transform duration-300 hover:scale-105 shadow-lg relative overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ minHeight: 180 }}
      >
        <span
          ref={dotRef}
          className="pointer-events-none absolute w-3 h-3 rounded-full bg-white opacity-80 transition-transform duration-150"
          style={{ left: 0, top: 0, transform: 'translate(-9999px, -9999px)' }}
        />
        {children}
      </div>
    );
  }
};

export default Services;

import { useState } from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import { FiCamera, FiEdit, FiImage } from 'react-icons/fi';
import ServiceCard from '../components/ServiceCard';

const services = [
  {
    title: 'Photography',
    icon: <FiCamera size={26} />,
    description: 'Capture unforgettable moments with professional photography services tailored to events, portraits, and lifestyle.',
  },
  {
    title: 'Photo Editing',
    icon: <FiEdit size={26} />,
    description: 'Transform your photos with expert retouching, color grading, and creative enhancements.',
  },
  {
    title: 'Prints for Sale',
    icon: <FiImage size={26} />,
    description: 'Buy high-quality photo prints for your home or office, with a wide variety of themes and styles.',
  }
];

const Services = () => {
  return (
    <section className="min-h-screen px-6 py-24 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60"
        >
          Our Services
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Services;

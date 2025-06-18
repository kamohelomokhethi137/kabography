import { useState } from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import { FiCamera, FiEdit, FiImage, FiLayout } from 'react-icons/fi';
import ServiceCard from '../components/ServiceCard';
import TrueFocus from '../components/TrueFocus';

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
  }
];

const Services = () => {
  return (
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
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Services;

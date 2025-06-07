import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Image1 from "../assets/gallery/1.jpg";
import Image2 from "../assets/gallery/2.jpg";
import Image3 from "../assets/gallery/3.jpg";
import Image4 from "../assets/gallery/4.jpg";
import Image5 from "../assets/gallery/5.jpg";
import Image6 from "../assets/gallery/6.jpg";

gsap.registerPlugin(ScrollTrigger);

const images = [Image1, Image2, Image3, Image4, Image5, Image6];

const PinterestGrid = () => {
  const sectionRef = useRef(null);
  const imgRefs = useRef([]);
  imgRefs.current = [];

  // For mobile horizontal scroll index
  const [currentIndex, setCurrentIndex] = useState(0);

  const addToRefs = (el) => {
    if (el && !imgRefs.current.includes(el)) {
      imgRefs.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      imgRefs.current.forEach((img, index) => {
        gsap.fromTo(
          img,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power3.out",
            duration: 0.5,
            delay: index * 0.05,
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Animate all view gallery buttons with subtle spring scale animation
      gsap.utils.toArray(".view-gallery-btn").forEach((btn) => {
        gsap.to(btn, {
          scale: 1.1,
          opacity: 0.7,
          repeat: -1,
          yoyo: true,
          ease: "elastic.out(1, 0.3)",
          duration: 1.5,
          paused: false,
          // Make sure initial scale is 1 and opacity 0.7
          onStart: () => {
            btn.style.opacity = "0.7";
            btn.style.transformOrigin = "center";
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Handle Prev/Next buttons on mobile
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 bg-[#f8f8f8] text-black overflow-hidden relative"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-semibold mb-14 text-center tracking-wide">
          Explore the Essence of Light
        </h2>

        {/* Desktop / Tablet grid */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((src, i) => (
            <div
              ref={addToRefs}
              key={i}
              className="relative rounded-xl overflow-hidden shadow-xl transform-gpu transition duration-700"
              style={{ zIndex: images.length - i }}
            >
              <img
                src={src}
                alt={`Gallery ${i + 1}`}
                className="w-full h-72 object-cover rounded-xl"
                loading="lazy"
              />

              {/* View Gallery button on every image */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <a
                  href="#gallery"
                  className="view-gallery-btn bg-black text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2 hover:opacity-100 transition-opacity pointer-events-auto"
                  style={{ opacity: 0.7 }}
                >
                  View Gallery
                  <span className="text-lg">↓</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile horizontal scroll */}
        <div className="sm:hidden relative">
          <div className="overflow-x-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((src, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-full rounded-xl overflow-hidden shadow-xl relative"
                  style={{ zIndex: images.length - i }}
                >
                  <img
                    src={src}
                    alt={`Gallery ${i + 1}`}
                    className="w-full h-72 object-cover rounded-xl"
                    loading="lazy"
                  />
                  {/* View Gallery button on every image */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <a
                      href="#gallery"
                      className="view-gallery-btn bg-black text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2 hover:opacity-100 transition-opacity pointer-events-auto"
                      style={{ opacity: 0.7 }}
                    >
                      View Gallery
                      <span className="text-lg">↓</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prev / Next buttons */}
          <div className="flex justify-between mt-4 px-4">
            <button
              onClick={handlePrev}
              className="bg-black text-white px-5 py-2 rounded-full font-semibold hover:bg-gray-800 transition"
              aria-label="Previous Image"
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              className="bg-black text-white px-5 py-2 rounded-full font-semibold hover:bg-gray-800 transition"
              aria-label="Next Image"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PinterestGrid;

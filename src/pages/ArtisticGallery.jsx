import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Your local image imports
import Image1 from "../assets/gallery/1.jpg";
import Image2 from "../assets/gallery/2.jpg";
import Image3 from "../assets/gallery/3.jpg";
import Image4 from "../assets/gallery/4.jpg";
import Image5 from "../assets/gallery/5.jpg";
import Image6 from "../assets/gallery/6.jpg";

gsap.registerPlugin(ScrollTrigger);

const images = [Image1, Image2, Image3, Image4, Image5, Image6];

const ArtisticGallery = () => {
  const sectionRef = useRef(null);
  const imgRefs = useRef([]);
  imgRefs.current = [];

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
            opacity: index === images.length - 1 ? 0.3 : 1,
            ease: "power3.out",
            duration: 1,
            delay: index * 0.001,
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 bg-[#f8f8f8] text-black overflow-hidden relative"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-semibold mb-14 text-center tracking-wide">
          Explore the Essence of Light
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className={`w-full h-72 object-cover rounded-xl ${i === images.length - 1 ? "opacity-30" : ""
                  }`}
                loading="lazy"
              />

              {/* Bouncing View Gallery Button on the last image */}
              {i === images.length - 1 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <a
                    href="#gallery"
                    className="animate-bounce bg-black text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2 hover:bg-gray-800 transition"
                  >
                    View Gallery
                    <span className="text-lg">↓</span>
                  </a>
                </div>
              )}
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default ArtisticGallery;

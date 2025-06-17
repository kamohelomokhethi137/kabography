import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

import Image1 from "../assets/gallery/1.webp";
import Image2 from "../assets/gallery/2.webp";
import Image3 from "../assets/gallery/3.webp";
import Image4 from "../assets/gallery/4.webp";
import Image5 from "../assets/gallery/5.webp";
import Image6 from "../assets/gallery/6.webp";

Modal.setAppElement("#root");

const images = [Image1, Image2, Image3, Image4, Image5, Image6];

const PinterestGrid = () => {
  const sectionRef = useRef(null);
  const imgRefs = useRef([]);
  imgRefs.current = [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  const navigate = useNavigate();

  const addToRefs = (el) => {
    if (el && !imgRefs.current.includes(el)) {
      imgRefs.current.push(el);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.transition = "transform 0.6s ease-out, opacity 0.6s ease-out";
            entry.target.style.transform = "translateY(0)";
            entry.target.style.opacity = "1";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    imgRefs.current.forEach((img) => {
      img.style.willChange = "transform, opacity";
      img.style.transform = "translateY(20px)";
      img.style.opacity = "0";
      observer.observe(img);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoScroll) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [autoScroll]);

  const handlePrev = () => {
    setAutoScroll(false);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setAutoScroll(false);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const openModal = (index) => {
    setModalImageIndex(index);
    setModalOpen(true);
    setAutoScroll(false);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 bg-[#f8f8f8] text-black overflow-hidden relative"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-semibold mb-14 text-center tracking-wide">
          Explore the Essence of Light
        </h2>

        {/* Desktop Grid */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((src, i) => (
            <div
              ref={addToRefs}
              key={i}
              className="relative rounded-xl overflow-hidden shadow-xl will-change-transform cursor-pointer"
              onClick={() => openModal(i)}
            >
              <img
                src={src}
                alt={`Gallery ${i + 1}`}
                className="w-full h-72 object-cover rounded-xl"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Mobile Swipe Gallery */}
        <div className="sm:hidden relative" {...swipeHandlers}>
          <div className="overflow-x-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((src, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-full rounded-xl overflow-hidden shadow-xl relative"
                  onClick={() => openModal(i)}
                >
                  <img
                    src={src}
                    alt={`Gallery ${i + 1}`}
                    className="w-full h-72 object-cover rounded-xl"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 text-white p-2 rounded-full z-10"
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 text-white p-2 rounded-full z-10"
          >
            <FiChevronRight size={24} />
          </button>
        </div>

        {/* VIEW GALLERY BUTTON */}
        <div className="flex justify-center mt-12">
          <button
            className="group relative flex items-center border-none bg-transparent cursor-pointer uppercase text-sm tracking-[4px] text-black"
            style={{ padding: 0 }}
            onClick={() => navigate("/gallery")}
          >
            <span className="relative pb-[7px] pr-[15px]">
              <span className="hover-underline-animation relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-black after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-hover:after:origin-bottom-left">
                View gallery
              </span>
            </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="10"
              viewBox="0 0 46 16"
              className="transition-transform duration-300 transform -translate-x-2 group-hover:translate-x-0 active:scale-90"
            >
              <path
                d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                transform="translate(30)"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Image Viewer"
        className="fixed inset-0 flex items-center justify-center bg-black/90 p-4"
        overlayClassName="fixed inset-0 bg-black/80 z-50"
      >
        <div className="relative max-w-3xl w-full">
          <img
            src={images[modalImageIndex]}
            alt={`Full View ${modalImageIndex + 1}`}
            className="w-full h-auto rounded-xl object-contain"
          />
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 bg-white text-black p-2 rounded-full z-50"
          >
            <FiX size={20} />
          </button>
        </div>
      </Modal>
    </section>
  );
};

export default PinterestGrid;
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaWhatsapp,
  FaFacebook,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black text-white px-6 py-16 overflow-hidden backdrop-blur-md">

      {/* 🔺 SVG Wave Divider Top */}
      <div className="absolute -top-1 left-0 w-full rotate-180 leading-[0] z-10 text-black">
        <svg
          className="block w-full h-12"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            d="M0,0V46.29c47.36,22.09,104.83,30.87,158.16,22.49
              c70.15-11.38,136.08-48.09,206.24-56.21
              c73.22-8.41,146.06,15.85,218.19,35.52
              c75.59,20.48,150.15,27.85,224.4,8.52
              c54.06-14.1,104.91-41.49,158.76-57.63
              C1041,5.63,1119.47,4.26,1200,10.8V0Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* 🔆 Ripple Animated Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 30%, rgba(255,255,255,0.03) 0%, transparent 70%),
            radial-gradient(circle at 70% 50%, rgba(255,255,255,0.02) 0%, transparent 80%)
          `,
          animation: "rippleMotion 12s ease-in-out infinite",
          maskImage: "radial-gradient(circle, black 60%, transparent 100%)",
          opacity: 0.5,
        }}
      />
      <style>{`
        @keyframes rippleMotion {
          0%, 100% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.03) translateY(-10px); }
        }
      `}</style>

      {/* 🌐 Content */}
      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-4 gap-10 text-sm sm:text-base">
        {/* Brand Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-2 tracking-wide">Kabography</h2>
          <p className="text-gray-400 leading-relaxed max-w-sm">
            Capturing timeless moments through lenses, creativity, and care.
          </p>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-gray-400">
            {["Home", "Gallery", "Services", "About"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-white transition"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <address className="text-gray-400 space-y-2 not-italic">
            <p>Maseru, Lesotho</p>
            <p>+266 5318 2775</p>
            <p>+266 6255 0097</p>
          </address>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-5 text-xl text-gray-400">
            <a href="#" className="hover:text-white transition">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaInstagram />
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=26653182775"
              className="hover:text-white transition"
            >
              <FaWhatsapp />
            </a>
          </div>
        </motion.div>
      </div>

      {/* 📩 Developer & Copyright */}
      <div className="border-t border-white/10 mt-12 pt-6 text-center text-gray-400">
        <p className="mb-3">Contact the developer of this site:</p>
        <div className="flex justify-center gap-6 text-2xl mb-4">
          <a
            href="https://www.facebook.com/kamohelo.mokhethi.712"
            className="hover:text-white transition"
          >
            <FaFacebook />
          </a>
          <a
            href="https://api.whatsapp.com/send/?phone=26657736313"
            className="hover:text-white transition"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://www.linkedin.com/in/kamohelo-mokhethi-b99b12365"
            className="hover:text-white transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/kamohelomokhethi137"
            className="hover:text-white transition"
          >
            <FaGithub />
          </a>
        </div>
        <p className="text-xs text-gray-500">
          &copy; {currentYear} Kabography. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

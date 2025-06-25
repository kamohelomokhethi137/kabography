import { motion } from "framer-motion";
import {
  FaInstagram,
  FaWhatsapp,
  FaFacebook,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-black/60 text-white py-10 px-4 text-sm sm:text-base overflow-hidden backdrop-blur-md">
      {/* Water Blur Animation Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.02) 0%, transparent 70%),
            radial-gradient(circle at 60% 40%, rgba(255, 255, 255, 0.02) 0%, transparent 80%)
          `,
          animation: "rippleMotion 12s ease-in-out infinite",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          maskImage: "radial-gradient(circle, black 50%, transparent 100%)",
          opacity: 0.5,
        }}
      />

      {/* Keyframes for rippleMotion */}
      <style>{`
        @keyframes rippleMotion {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.02);
          }
        }
      `}</style>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="col-span-1"
          >
            <h2
              className="text-3xl sm:text-4xl font-medium mb-3"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              Kabography
            </h2>
            <p className="text-gray-400 max-w-xs">
              Capturing moments that last forever.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              {["Home", "Gallery", "Services", "About"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="text-gray-400 not-italic space-y-1">
              <p>Maseru, Lesotho</p>
              <p>Contacts: +266 5318 2775 / 6255 0097</p>
            </address>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 text-xl text-gray-400">
              <a href="#" className="hover:text-white">
                <FaFacebook />
              </a>
              <a href="#" className="hover:text-white">
                <FaInstagram />
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=26653182775"
                className="hover:text-white"
              >
                <FaWhatsapp />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 pt-6 mt-6 text-center">
          <p className="text-gray-400 mb-3">Contact the developer of this site:</p>
          <div className="flex justify-center space-x-5 text-2xl text-gray-400">
            <a href="https://www.facebook.com/kamohelo.mokhethi.712" className="hover:text-white">
              <FaFacebook />
            </a>
            <a href="https://api.whatsapp.com/send/?phone=26657736313" className="hover:text-white">
              <FaWhatsapp />
            </a>
            <a href="https://www.linkedin.com/in/kamohelo-mokhethi-b99b12365?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="hover:text-white">
              <FaLinkedin />
            </a>
            <a href="https://github.com/kamohelomokhethi137" className="hover:text-white">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

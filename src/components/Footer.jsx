import { motion } from "framer-motion";
import {
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
  FaFacebook,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-4 text-sm sm:text-base">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Logo & Tagline */}
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

          {/* Quick Links */}
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

          {/* Contact Info */}
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

          {/* Client Social Media */}
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
              <a href="https://api.whatsapp.com/send/?phone=26653182775&text=Hello%2C%20I%20would%20like%20to%20book%20a%20photoshoot%20session%20with%20you.&type=phone_number&app_absent=0" className="hover:text-white">
                <FaWhatsapp />
              </a>
              <a href="" className="hover:text-white">
                <FaYoutube />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Developer Contact Section */}
        <div className="border-t border-gray-800 pt-6 mt-6 text-center">
          <p className="text-gray-400 mb-3">Contact the developer of this site:</p>
          <div className="flex justify-center space-x-5 text-2xl text-gray-400">
            <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <FaFacebook />
            </a>
            <a href="https://api.whatsapp.com/send/?phone=26657736313&text=Hello%2C+I+saw+your+website%21&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <FaWhatsapp />
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <FaLinkedin />
            </a>
            <a href="https://github.com/kamohelomokhethi137" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

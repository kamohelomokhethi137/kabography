import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const inputVariants = {
  focused: { scale: 1.05, boxShadow: "0 0 8px rgba(255, 255, 255, 0.6)" },
  unfocused: { scale: 1, boxShadow: "none" }
};

const buttonVariants = {
  hover: { scale: 1.1, boxShadow: "0 0 15px rgba(255, 255, 255, 0.8)" },
  tap: { scale: 0.95 }
};

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [focused, setFocused] = useState({ name: false, email: false, message: false });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFocus = (field) => {
    setFocused({ ...focused, [field]: true });
  };

  const handleBlur = (field) => {
    setFocused({ ...focused, [field]: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (API call or email)
    alert(`Thanks for reaching out, ${form.name}!`);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-tr from-purple-900 via-indigo-900 to-black text-white flex flex-col justify-center items-center px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="max-w-xl w-full"
        >
          <h2 className="text-4xl font-extrabold mb-8 tracking-wide" style={{ fontFamily: "'The Seasons', serif" }}>
            Get In Touch
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <motion.input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              onFocus={() => handleFocus('name')}
              onBlur={() => handleBlur('name')}
              variants={inputVariants}
              animate={focused.name ? "focused" : "unfocused"}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-transparent border-b border-white placeholder-white/70 text-white outline-none py-2 px-1 text-lg"
              required
            />

            <motion.input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              onFocus={() => handleFocus('email')}
              onBlur={() => handleBlur('email')}
              variants={inputVariants}
              animate={focused.email ? "focused" : "unfocused"}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-transparent border-b border-white placeholder-white/70 text-white outline-none py-2 px-1 text-lg"
              required
            />

            <motion.textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              onFocus={() => handleFocus('message')}
              onBlur={() => handleBlur('message')}
              variants={inputVariants}
              animate={focused.message ? "focused" : "unfocused"}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-transparent border-b border-white placeholder-white/70 text-white outline-none py-2 px-1 text-lg resize-none"
              required
            />

            <motion.button
              type="submit"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 rounded-full shadow-lg tracking-widest"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;

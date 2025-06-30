import { useState } from 'react';
import {
  FiCalendar,
  FiClock,
  FiCamera,
  FiMail,
  FiPhone,
  FiCheck
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const sessionTypes = [
  { name: 'Portrait', icon: <FiCamera className="mr-1" /> },
  { name: 'Wedding', icon: <FiCamera className="mr-1" /> },
  { name: 'Graduation', icon: <FiCamera className="mr-1" /> },
  { name: 'Event', icon: <FiCamera className="mr-1" /> },
  { name: 'Studio', icon: <FiCamera className="mr-1" /> }
];

const shake = {
  hidden: { x: 0 },
  visible: {
    x: [0, -8, 8, -6, 6, -4, 4, 0],
    transition: { duration: 0.4 },
  },
};

const BookingCard = () => {
  const [sessionType, setSessionType] = useState('Portrait');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [shakeError, setShakeError] = useState(false);

  const validate = () => {
    const errorObj = {};
    const now = new Date();
    const selectedDateTime = new Date(`${date}T${time}`);

    if (!date) errorObj.date = 'Please select a date';
    if (!time) errorObj.time = 'Please select a time';
    if (date && time && selectedDateTime <= now) {
      errorObj.datetime = 'Selected time must be in the future';
    }

    setErrors(errorObj);
    return Object.keys(errorObj).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setErrors({});
      setTimeout(() => setSubmitted(false), 3000);
    } else {
      triggerShake();
    }
  };

  const handleContactClick = (e) => {
    if (!validate()) {
      e.preventDefault();
      triggerShake();
    }
  };

  const triggerShake = () => {
    setShakeError(true);
    setTimeout(() => setShakeError(false), 500);
  };

  const whatsappMessage = `Hello Kabography! I'd like to book a ${sessionType} session on ${date} at ${time}.`;
  const whatsappLink = `https://wa.me/26653182775?text=${encodeURIComponent(whatsappMessage)}`;
  const mailtoLink = `mailto:kabography@gmail.com?subject=Booking%20a%20${sessionType}%20Session&body=${encodeURIComponent(
    `Hi Kabography,\n\nI'd like to book a ${sessionType} session on ${date} at ${time}.\n\nLooking forward to your response!`
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-6 mx-auto text-black"
    >
      <div className="text-center mb-6">
        <FiCamera className="mx-auto text-3xl mb-2 text-gray-700" />
        <h2 className="text-2xl font-bold">Book a Photography Session</h2>
        <p className="text-gray-600 mt-1">Capture your special moments with us</p>
      </div>

      {submitted ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-8"
        >
          <div className="bg-green-100 text-green-700 p-4 rounded-xl inline-flex items-center">
            <FiCheck className="mr-2 text-xl" />
            <span>Your booking request has been sent!</span>
          </div>
          <p className="mt-4 text-gray-600">We'll contact you shortly to confirm your session.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          {/* Session Types */}
          <div className="mb-6">
            <label className="block mb-3 text-sm font-medium text-gray-700">Select Session Type</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {sessionTypes.map((type) => (
                <button
                  key={type.name}
                  type="button"
                  onClick={() => setSessionType(type.name)}
                  className={`group px-3 py-2 rounded-lg text-sm flex items-center justify-center transition-all ${
                    sessionType === type.name
                      ? 'bg-black text-white shadow-md'
                      : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {type.icon}
                  {type.name}
                </button>
              ))}
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-gray-700 flex items-center gap-2">
                <FiCalendar className="text-gray-500" /> Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-black"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
            </div>
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-gray-700 flex items-center gap-2">
                <FiClock className="text-gray-500" /> Time
              </label>
              <input
                type="time"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-black"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
              {errors.datetime && <p className="text-red-500 text-sm mt-1">{errors.datetime}</p>}
            </div>
          </div>

          {/* Contact Buttons */}
          <motion.div
            variants={shake}
            animate={shakeError ? 'visible' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            <a
              href={whatsappLink}
              onClick={handleContactClick}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all hover:bg-green-700 shadow hover:shadow-md"
            >
              <FaWhatsapp className="text-xl" /> WhatsApp
            </a>
            <a
              href={mailtoLink}
              onClick={handleContactClick}
              className="bg-blue-600 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all hover:bg-blue-700 shadow hover:shadow-md"
            >
              <FiMail /> Email
            </a>
          </motion.div>

          <div className="mt-4 text-center text-sm text-gray-500 flex items-center justify-center gap-2">
            <FiPhone className="text-gray-400" />
            <span>Or call us directly: +266 5318 2775</span>
          </div>
        </form>
      )}
    </motion.div>
  );
};

export default BookingCard;
    
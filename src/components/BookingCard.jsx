import { useState } from 'react';
import {
  FiCalendar,
  FiClock,
  FiCamera,
  FiMail,
  FiPhone,
  FiCheck,
  FiX,
  FiVideo
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const sessionTypes = [
  { name: 'Portrait', icon: <FiCamera className="mr-1" /> },
  { name: 'Wedding', icon: <FiCamera className="mr-1" /> },
  { name: 'Graduation', icon: <FiCamera className="mr-1" /> },
  { name: 'Event', icon: <FiVideo className="mr-1" /> },
  { name: 'Studio', icon: <FiCamera className="mr-1" /> }
];

// Wedding Packages
const weddingPackages = [
  {
    name: 'Silver',
    price: 'R2500.00',
    features: ['150 edited pictures', 'A4 Canvas print']
  },
  {
    name: 'Gold',
    price: 'R5000.00',
    features: ['300+ edited pictures', 'A3 Canvas print', 'Trailer Video']
  },
  {
    name: 'Gold (Full Day)',
    price: 'R5000.00',
    features: ['Full Day Coverage', 'Free Invitation']
  },
  {
    name: 'Platinum',
    price: 'R9500.00',
    features: ['450+ edited pictures', 'A2 Canvas print', 'Wedding Summary Video']
  },
  {
    name: 'Platinum (Full Day)',
    price: 'R14000.00',
    features: ['600 edited pictures', 'A0 Canvas print', 'Summary and Trailer Video']
  }
];

// Studio Packages
const studioPackages = [
  {
    name: 'Individual Photos',
    price: 'R15.00 per picture',
    features: ['Pay per photo']
  },
  {
    name: 'Package 1',
    price: 'M300.00',
    features: ['20 Pictures']
  },
  {
    name: 'Package 2',
    price: 'M600.00',
    features: ['40 Pictures']
  },
  {
    name: 'Package 3',
    price: 'M750.00',
    features: ['50 Pictures']
  }
];

const studioAddons = [
  {
    name: 'Changing Attire',
    price: 'M50.00',
    description: 'Additional outfit changes during session'
  }
];

// Event Packages
const eventPackages = {
  photos: [
    { name: '20 Photos', price: 'R250/hour' },
    { name: '40 Photos', price: 'R500/hour' },
    { name: '60 Photos', price: 'R750/hour' },
    { name: '80 Photos', price: 'R1,025 (flat)' },
    { name: '100 Photos', price: 'R1,250 (flat)' },
    { name: '200 Photos', price: 'R2,500 (flat)' }
  ],
  videos: [
    { name: '2-3 min Video', price: 'R250/hour' },
    { name: '5-7 min Video', price: 'R550/hour' },
    { name: '10-15 min Video', price: 'R950/hour' },
    { name: '20-30 min Video', price: 'R1,500 (flat)' },
    { name: '30+ min Video', price: 'R3,000 (flat)' },
    { name: '1 hour+ Video', price: 'R7,000 (flat)' },
    { name: '2 hours+ Video', price: 'R11,000 (flat)' }
  ],
  invitations: [
    { name: 'Photo Slides', price: 'R250' },
    { name: 'Invitation Video', price: 'R450' }
  ]
};

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
  const [showPackagesModal, setShowPackagesModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [selectedEventServices, setSelectedEventServices] = useState({
    photos: null,
    videos: null,
    invitations: []
  });

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

  const handleSessionTypeChange = (name) => {
    setSessionType(name);
    setSelectedPackage(null);
    setSelectedAddons([]);
    setSelectedEventServices({
      photos: null,
      videos: null,
      invitations: []
    });
    
    if (['Wedding', 'Studio', 'Event'].includes(name)) {
      setShowPackagesModal(true);
    }
  };

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setShowPackagesModal(false);
  };

  const handleEventServiceSelect = (type, service) => {
    if (type === 'invitations') {
      setSelectedEventServices(prev => ({
        ...prev,
        invitations: prev.invitations.some(s => s.name === service.name)
          ? prev.invitations.filter(s => s.name !== service.name)
          : [...prev.invitations, service]
      }));
    } else {
      setSelectedEventServices(prev => ({
        ...prev,
        [type]: prev[type]?.name === service.name ? null : service
      }));
    }
  };

  const toggleAddon = (addon) => {
    setSelectedAddons(prev => 
      prev.some(a => a.name === addon.name) 
        ? prev.filter(a => a.name !== addon.name)
        : [...prev, addon]
    );
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

  const generateServiceSummary = () => {
    let summary = '';
    
    if (sessionType === 'Event') {
      if (selectedEventServices.photos) {
        summary += `Photos: ${selectedEventServices.photos.name} (${selectedEventServices.photos.price}), `;
      }
      if (selectedEventServices.videos) {
        summary += `Video: ${selectedEventServices.videos.name} (${selectedEventServices.videos.price}), `;
      }
      if (selectedEventServices.invitations.length > 0) {
        summary += `Invitations: ${selectedEventServices.invitations.map(i => i.name).join(', ')} (${selectedEventServices.invitations.map(i => i.price).join(', ')}), `;
      }
    } else if (selectedPackage) {
      summary += `Package: ${selectedPackage.name} (${selectedPackage.price}), `;
      if (selectedAddons.length > 0) {
        summary += `Addons: ${selectedAddons.map(a => a.name).join(', ')} (${selectedAddons.map(a => a.price).join(', ')}), `;
      }
    }
    
    return summary;
  };

  const whatsappMessage = `Hello Kabography! I'd like to book a ${sessionType} session on ${date} at ${time}. ${generateServiceSummary()}`;
  const whatsappLink = `https://wa.me/26653182775?text=${encodeURIComponent(whatsappMessage)}`;
  const mailtoLink = `mailto:kabography@gmail.com?subject=Booking%20a%20${sessionType}%20Session&body=${encodeURIComponent(
    `Hi Kabography,\n\nI'd like to book a ${sessionType} session on ${date} at ${time}.\n\nServices:\n${generateServiceSummary()}\n\nLooking forward to your response!`
  )}`;

  const renderPackagesModal = () => {
    switch (sessionType) {
      case 'Wedding':
        return (
          <div className="space-y-4">
            <h4 className="font-medium text-lg mb-3">Wedding Packages</h4>
            {weddingPackages.map((pkg, index) => (
              <div
                key={index}
                onClick={() => handlePackageSelect(pkg)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedPackage?.name === pkg.name
                    ? 'border-black bg-gray-50'
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{pkg.name}</h4>
                  <span className="font-bold">{pkg.price}</span>
                </div>
                <ul className="mt-2 text-sm text-gray-600 space-y-1">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      case 'Studio':
        return (
          <>
            <div className="mb-6">
              <h4 className="font-medium mb-3">Base Pricing</h4>
              <p className="text-gray-600">R15.00 per picture (individual photo rate)</p>
            </div>

            <div className="space-y-4 mb-6">
              <h4 className="font-medium">Packages</h4>
              {studioPackages.map((pkg, index) => (
                <div
                  key={index}
                  onClick={() => handlePackageSelect(pkg)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedPackage?.name === pkg.name
                      ? 'border-black bg-gray-50'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{pkg.name}</h4>
                    <span className="font-bold">{pkg.price}</span>
                  </div>
                  <ul className="mt-2 text-sm text-gray-600 space-y-1">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <h4 className="font-medium mb-3">Additional Services</h4>
              {studioAddons.map((addon, index) => (
                <div
                  key={index}
                  onClick={() => toggleAddon(addon)}
                  className={`p-3 border rounded-lg cursor-pointer transition-all mb-2 ${
                    selectedAddons.some(a => a.name === addon.name)
                      ? 'border-black bg-gray-50'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-medium">{addon.name}</h5>
                      <p className="text-sm text-gray-600">{addon.description}</p>
                    </div>
                    <span className="font-bold">{addon.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        );
      case 'Event':
        return (
          <>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Photo Packages</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {eventPackages.photos.map((service, index) => (
                    <div
                      key={`photo-${index}`}
                      onClick={() => handleEventServiceSelect('photos', service)}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        selectedEventServices.photos?.name === service.name
                          ? 'border-black bg-gray-50'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <h5 className="font-medium">{service.name}</h5>
                        <span className="font-bold">{service.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Video Packages</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {eventPackages.videos.map((service, index) => (
                    <div
                      key={`video-${index}`}
                      onClick={() => handleEventServiceSelect('videos', service)}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        selectedEventServices.videos?.name === service.name
                          ? 'border-black bg-gray-50'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <h5 className="font-medium">{service.name}</h5>
                        <span className="font-bold">{service.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Invitation Services</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {eventPackages.invitations.map((service, index) => (
                    <div
                      key={`invite-${index}`}
                      onClick={() => handleEventServiceSelect('invitations', service)}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        selectedEventServices.invitations.some(s => s.name === service.name)
                          ? 'border-black bg-gray-50'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <h5 className="font-medium">{service.name}</h5>
                        <span className="font-bold">{service.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const renderSelectedServices = () => {
    if (sessionType === 'Event') {
      const hasServices = selectedEventServices.photos || selectedEventServices.videos || selectedEventServices.invitations.length > 0;
      if (!hasServices) return null;

      return (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-800 mb-2">Selected Event Services</h3>
          
          {selectedEventServices.photos && (
            <div className="mb-2">
              <div className="flex justify-between">
                <span className="font-medium">Photos:</span>
                <span>{selectedEventServices.photos.price}</span>
              </div>
              <p className="text-sm text-gray-600">{selectedEventServices.photos.name}</p>
            </div>
          )}

          {selectedEventServices.videos && (
            <div className="mb-2">
              <div className="flex justify-between">
                <span className="font-medium">Video:</span>
                <span>{selectedEventServices.videos.price}</span>
              </div>
              <p className="text-sm text-gray-600">{selectedEventServices.videos.name}</p>
            </div>
          )}

          {selectedEventServices.invitations.length > 0 && (
            <div>
              <h4 className="font-medium text-sm text-gray-800">Invitations:</h4>
              <ul className="text-xs text-gray-600">
                {selectedEventServices.invitations.map((invite, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{invite.name}</span>
                    <span>{invite.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    } else if (selectedPackage) {
      return (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="mb-2">
            <h3 className="font-medium text-gray-800">{selectedPackage.name}</h3>
            <p className="text-sm text-gray-600">{selectedPackage.price}</p>
            <ul className="mt-1 text-xs text-gray-600 list-disc list-inside">
              {selectedPackage.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
          
          {selectedAddons.length > 0 && (
            <div>
              <h4 className="font-medium text-sm text-gray-800">Add-ons:</h4>
              <ul className="text-xs text-gray-600">
                {selectedAddons.map((addon, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{addon.name}</span>
                    <span>{addon.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-6 mx-auto text-black relative"
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
                  onClick={() => handleSessionTypeChange(type.name)}
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

          {/* Selected Services/Packages */}
          {renderSelectedServices()}

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

      {/* Packages Modal */}
      <AnimatePresence>
        {showPackagesModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                <h3 className="text-lg font-bold">
                  {sessionType === 'Wedding' && 'Wedding Packages'}
                  {sessionType === 'Studio' && 'Studio Packages'}
                  {sessionType === 'Event' && 'Event Services'}
                </h3>
                <button
                  onClick={() => setShowPackagesModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={20} />
                </button>
              </div>
              <div className="p-4">
                {renderPackagesModal()}
                <button
                  onClick={() => setShowPackagesModal(false)}
                  className="mt-4 w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Confirm Selection
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BookingCard;
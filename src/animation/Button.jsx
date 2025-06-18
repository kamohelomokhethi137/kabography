import { useState } from 'react';

const Button = ({ children, href, icon }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative inline-flex items-center justify-center 
        px-8 py-4 text-xs
        sm:px-6 sm:py-3 sm:text-sm
        md:px-10 md:py-4 md:text-base
        ${hovered ? 'bg-white text-black' : 'bg-white/10 text-white'}
        font-semibold uppercase tracking-wider overflow-hidden 
        transition-all duration-500 backdrop-blur-md border border-white/20`}
    >
      {/* Background flash effect */}
      <div
        className="absolute"
        style={{
          content: "''",
          position: 'absolute',
          width: hovered ? '100%' : '0%',
          height: hovered ? '100%' : '0%',
          left: hovered ? '0%' : '50%',
          top: hovered ? '0%' : '50%',
          backgroundColor: 'white',
          boxShadow: '0 0 10px white, 0 0 30px white, 0 0 50px white',
          transition: 'all 500ms',
          zIndex: 0,
        }}
      />

      {/* Button text and icon */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon}
      </span>

      {/* Animated corner lines */}
      <div
        className="absolute top-0 left-0 bg-white shadow-[0_0_15px_white,0_0_30px_white,0_0_50px_white] transition-all duration-500"
        style={{ width: hovered ? '100%' : '15px', height: '2px' }}
      />
      <div
        className="absolute bottom-0 right-0 bg-white shadow-[0_0_15px_white,0_0_30px_white,0_0_50px_white] transition-all duration-500"
        style={{ width: hovered ? '100%' : '15px', height: '2px' }}
      />
      <div
        className="absolute top-0 left-0 bg-white shadow-[0_0_15px_white,0_0_30px_white,0_0_50px_white] transition-all duration-500"
        style={{ width: '2px', height: hovered ? '100%' : '15px' }}
      />
      <div
        className="absolute bottom-0 right-0 bg-white shadow-[0_0_15px_white,0_0_30px_white,0_0_50px_white] transition-all duration-500"
        style={{ width: '2px', height: hovered ? '100%' : '15px' }}
      />
    </a>
  );
};

export default Button;

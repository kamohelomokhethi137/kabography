import { useState } from 'react';

const Button = ({ children, href, icon }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative inline-flex items-center justify-center
        px-8 py-4 text-xs sm:px-6 sm:py-3 sm:text-sm md:px-10 md:py-4 md:text-base
        font-semibold uppercase tracking-wider transition-all duration-500
        overflow-hidden rounded-xl border border-white/20 backdrop-blur-md
        ${hovered ? 'bg-white' : 'bg-white/10'}
      `}
      style={{
        color: hovered ? 'black' : 'white',
        WebkitMaskImage:
          hovered &&
          'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 10%, transparent 60%)',
        WebkitMaskSize: hovered ? '300% 300%' : '100% 100%',
        WebkitMaskRepeat: 'no-repeat',
        transition: 'all 0.5s ease-in-out',
      }}
    >
      {/* Ripple Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 30%, rgba(255,255,255,0.05) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(255,255,255,0.05) 0%, transparent 50%)
          `,
          animation: 'rippleMotion 10s ease-in-out infinite',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          zIndex: 0,
        }}
      />

      {/* Ripple keyframes inline */}
      <style>
        {`
          @keyframes rippleMotion {
            0%, 100% {
              transform: translate(0, 0) scale(1);
            }
            50% {
              transform: translate(-5px, -5px) scale(1.02);
            }
          }
        `}
      </style>

      {/* Button Text and Icon */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon}
      </span>

      {/* Glowing Corner Lines */}
      {[
        { top: 0, left: 0, w: hovered ? '100%' : '20px', h: '2px' },
        { bottom: 0, right: 0, w: hovered ? '100%' : '20px', h: '2px' },
        { top: 0, left: 0, w: '2px', h: hovered ? '100%' : '20px' },
        { bottom: 0, right: 0, w: '2px', h: hovered ? '100%' : '20px' },
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute bg-white transition-all duration-500"
          style={{
            ...pos,
            width: pos.w,
            height: pos.h,
            boxShadow: '0 0 8px white, 0 0 20px white',
          }}
        />
      ))}
    </a>
  );
};

export default Button;

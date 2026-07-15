import React from 'react';

export default function CrownLogo({ className = "", size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* CROWN (top part) */}
      {/* The crown shape - 3 triangular points */}
      <path
        d="M12 18L16 10L20 16L24 8L28 16L32 10L36 18H12Z"
        fill="#c8a97e"
        stroke="#c8a97e"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Bottom band of the crown */}
      <rect x="12" y="18" width="24" height="3" rx="1" fill="#c8a97e" />
      {/* Small decorative dots (jewels) on the crown */}
      <circle cx="16" cy="14" r="1.5" fill="#1a1a1a" />
      <circle cx="24" cy="11" r="1.5" fill="#1a1a1a" />
      <circle cx="32" cy="14" r="1.5" fill="#1a1a1a" />

      {/* LETTER "d" (bottom part) */}
      {/* The curved bowl of the lowercase d */}
      <path
        d="M28 26C28 24.5 27.5 23.2 26.6 22.2C25.5 21 23.8 20.2 22 20.2H18V41.8H22C23.8 41.8 25.5 41 26.6 39.8C27.5 38.8 28 37.5 28 36V26Z"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* The vertical stem of the d */}
      <path
        d="M28 16V44"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Inner fill of the d (tan accent color) */}
      <path
        d="M22 25.5C23.2 25.5 24.2 26 24.9 26.8C25.5 27.5 25.8 28.4 25.8 29.5V36.5C25.8 37.6 25.5 38.5 24.9 39.2C24.2 40 23.2 40.5 22 40.5H20.5V25.5H22Z"
        fill="#c8a97e"
        opacity="0.9"
      />
    </svg>
  );
}

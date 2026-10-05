import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CursorGlow: React.FC = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    // Smooth cursor follow with GSAP quickTo
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-30 w-96 h-96 rounded-full bg-gradient-to-tr from-[#C86D51]/12 to-[#1E3A34]/8 blur-3xl opacity-75 hidden md:block"
      style={{ willChange: 'transform' }}
    />
  );
};

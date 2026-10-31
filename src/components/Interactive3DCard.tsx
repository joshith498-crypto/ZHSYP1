/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useCallback, useId } from 'react';

interface Interactive3DCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // max tilt degrees (default: 10)
  glare?: boolean;
  glareColor?: 'neutral' | 'brass' | 'green';
  liquidVariant?: 'ivory' | 'elevated' | 'forest' | 'brass' | 'clear';
  depth3d?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const Interactive3DCard: React.FC<Interactive3DCardProps> = ({
  children,
  className = '',
  intensity = 10,
  glare = true,
  glareColor = 'neutral',
  liquidVariant = 'ivory',
  depth3d = true,
  onClick,
  style = {},
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [glarePosition, setGlarePosition] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });
  const [shadowOffset, setShadowOffset] = useState<{ x: number; y: number }>({ x: 0, y: 8 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Mouse position from -0.5 to 0.5 relative to center
      const mouseX = (e.clientX - rect.left) / width - 0.5;
      const mouseY = (e.clientY - rect.top) / height - 0.5;

      const rotX = -(mouseY * intensity * 2);
      const rotY = mouseX * intensity * 2;

      // Drop shadow shifts opposite to tilt to simulate physical light source
      const sX = -(mouseX * 16);
      const sY = -(mouseY * 16) + 12;

      setTransform(
        `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`
      );
      setShadowOffset({ x: sX, y: sY });

      // Glare follows cursor coordinates in %
      const glareX = ((e.clientX - rect.left) / width) * 100;
      const glareY = ((e.clientY - rect.top) / height) * 100;
      setGlarePosition({ x: glareX, y: glareY, opacity: 1 });
    },
    [intensity]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smooth spring back to resting state
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setShadowOffset({ x: 0, y: 8 });
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  // Base liquid glass styling classes depending on variant
  const getVariantStyles = () => {
    switch (liquidVariant) {
      case 'elevated':
        return 'bg-[#FAF8F5]/90 backdrop-blur-xl border border-white/80 shadow-[0_16px_36px_rgba(31,61,51,0.08)]';
      case 'forest':
        return 'bg-[#1F3D33]/92 backdrop-blur-xl border border-white/20 text-[#FAF8F5] shadow-[0_20px_45px_rgba(15,31,25,0.25)]';
      case 'brass':
        return 'bg-[#B08D57]/15 backdrop-blur-xl border border-[#B08D57]/40 shadow-[0_16px_36px_rgba(176,141,87,0.14)]';
      case 'clear':
        return 'bg-white/60 backdrop-blur-md border border-white/70 shadow-[0_10px_30px_rgba(31,61,51,0.06)]';
      case 'ivory':
      default:
        return 'bg-[#FAF8F5]/85 backdrop-blur-lg border border-[#E5E0D8]/90 hover:border-[#B08D57]/70 shadow-[0_10px_28px_rgba(31,61,51,0.06)]';
    }
  };

  // Glare gradient style based on theme
  const getGlareGradient = () => {
    if (glareColor === 'brass') {
      return `radial-gradient(circle 320px at ${glarePosition.x}% ${glarePosition.y}%, rgba(224, 196, 142, 0.45) 0%, rgba(176, 141, 87, 0.12) 40%, transparent 75%)`;
    }
    if (glareColor === 'green') {
      return `radial-gradient(circle 320px at ${glarePosition.x}% ${glarePosition.y}%, rgba(120, 180, 155, 0.4) 0%, rgba(31, 61, 51, 0.1) 40%, transparent 75%)`;
    }
    // Neutral liquid white refraction
    return `radial-gradient(circle 340px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.15) 35%, transparent 75%)`;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative transition-[box-shadow] duration-200 ease-out will-change-transform rounded-sm overflow-hidden ${getVariantStyles()} ${className}`}
      style={{
        transform,
        transformStyle: depth3d ? 'preserve-3d' : 'flat',
        transition: isHovered
          ? 'transform 0.08s ease-out, box-shadow 0.15s ease-out'
          : 'transform 0.45s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.45s cubic-bezier(0.23, 1, 0.32, 1)',
        boxShadow: `${shadowOffset.x}px ${shadowOffset.y}px 32px -4px rgba(31, 61, 51, ${isHovered ? 0.11 : 0.05}), 0 1px 3px rgba(176, 141, 87, 0.08)`,
        ...style,
      }}
    >
      {/* Specular Glare / Liquid Light Refraction Layer */}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
          style={{
            background: getGlareGradient(),
            opacity: glarePosition.opacity,
            mixBlendMode: 'overlay',
          }}
          aria-hidden="true"
        />
      )}

      {/* Subtle Liquid Glass Specular Edge Highlight */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-sm border border-white/50 opacity-60"
        aria-hidden="true"
      />

      {/* Content wrapper with 3D Parallax Depth support */}
      <div
        className="relative z-10 h-full w-full"
        style={depth3d ? { transform: 'translateZ(12px)' } : undefined}
      >
        {children}
      </div>
    </div>
  );
};

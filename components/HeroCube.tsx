'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface CubeSquare {
  id: number;
  x: number;
  y: number;
}

const generateSquares = (): CubeSquare[] => {
  const squares: CubeSquare[] = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      squares.push({
        id: i * 3 + j,
        x: j,
        y: i,
      });
    }
  }
  return squares;
};

const gradients = [
  'from-purple-500 to-pink-500',
  'from-blue-500 to-cyan-500',
  'from-green-500 to-emerald-500',
  'from-orange-500 to-red-500',
  'from-yellow-500 to-amber-500',
  'from-indigo-500 to-purple-500',
  'from-pink-500 to-rose-500',
  'from-cyan-500 to-blue-500',
  'from-emerald-500 to-green-500',
];

export default function HeroCube() {
  const [squares] = useState<CubeSquare[]>(generateSquares());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const calculateTransform = (square: CubeSquare) => {
    const centerX = 1; // Center square x position
    const centerY = 1; // Center square y position
    const distanceX = square.x - centerX;
    const distanceY = square.y - centerY;
    
    // Calculate movement based on mouse position and distance from center
    const moveX = mousePosition.x * distanceX * 15;
    const moveY = mousePosition.y * distanceY * 15;
    
    return {
      x: moveX,
      y: moveY,
    };
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-md mx-auto aspect-square"
    >
      <div className="grid grid-cols-3 gap-3 md:gap-4 w-full h-full p-4">
        {squares.map((square, index) => {
          const transform = calculateTransform(square);
          const isCenter = square.x === 1 && square.y === 1;
          
          return (
            <motion.div
              key={square.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: transform.x,
                y: transform.y,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                x: { type: 'spring', stiffness: 150, damping: 15 },
                y: { type: 'spring', stiffness: 150, damping: 15 },
              }}
              whileHover={{
                scale: 1.1,
                rotate: 5,
                zIndex: 10,
              }}
              className={`
                rounded-2xl
                bg-gradient-to-br ${gradients[index]}
                shadow-lg
                ${isCenter ? 'ring-4 ring-white dark:ring-gray-800 ring-offset-2' : ''}
                cursor-pointer
                relative
                overflow-hidden
                group
              `}
            >
              {/* Shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Center square special content */}
              {isCenter && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center text-3xl">
                    👋
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}


'use client';

import { motion } from 'framer-motion';
import { interests } from '@/data/interests';
import { useState } from 'react';

export default function InterestsPage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Interests
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Beyond code and algorithms, here are the things that fuel my creativity
            and drive my passion for learning.
          </p>
        </motion.div>

        {/* Interests Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {interests.map((interest, index) => (
            <motion.div
              key={interest.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(interest.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative group"
            >
              <motion.div
                whileHover={{ y: -10 }}
                className="glass rounded-3xl p-8 h-full hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden"
              >
                {/* Background Gradient on Hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${interest.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon with Animation */}
                  <motion.div
                    animate={{
                      scale: hoveredId === interest.id ? 1.2 : 1,
                      rotate: hoveredId === interest.id ? [0, -10, 10, -10, 0] : 0,
                    }}
                    transition={{
                      duration: 0.5,
                      rotate: {
                        duration: 0.5,
                        ease: 'easeInOut',
                      },
                    }}
                    className="text-6xl mb-6 inline-block"
                  >
                    {interest.icon}
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">
                    {interest.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {interest.description}
                  </p>
                </div>

                {/* Shine Effect */}
                <motion.div
                  className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                  animate={{
                    left: hoveredId === interest.id ? '150%' : '-50%',
                  }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass rounded-3xl p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Tech Stack & Skills</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Languages */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span>💻</span> Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Python', 'JavaScript', 'TypeScript', 'C++', 'Java', 'Swift'].map((lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1 text-sm rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Frameworks */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span>🛠️</span> Frameworks
              </h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'Node.js', 'TensorFlow', 'PyTorch', 'ROS'].map((fw) => (
                  <span
                    key={fw}
                    className="px-3 py-1 text-sm rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                  >
                    {fw}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span>⚙️</span> Tools & More
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Git', 'Docker', 'AWS', 'Firebase', 'Figma', 'Linux'].map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 text-sm rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold mb-8">Fun Facts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { emoji: '🧩', fact: 'Can solve a Rubik\'s Cube in under 15 seconds' },
              { emoji: '⛰️', fact: 'Hiked 5 of the 10 highest peaks in Colorado' },
              { emoji: '🤖', fact: 'Built my first robot at age 14' },
              { emoji: '☕', fact: 'Coffee enthusiast (espresso is my favorite)' },
              { emoji: '🎮', fact: 'Competitive in League of Legends (Diamond tier)' },
              { emoji: '📚', fact: 'Read 30+ technical books last year' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="glass rounded-2xl p-6 hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-3">{item.emoji}</div>
                <p className="text-gray-700 dark:text-gray-300">{item.fact}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}


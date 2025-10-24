'use client';

import { motion } from 'framer-motion';
import PhotoGallery from '@/components/PhotoGallery';
import { photos } from '@/data/photos';
import { Award, BookOpen, Code, Heart } from 'lucide-react';

const stats = [
  { icon: Code, label: 'Projects Completed', value: '20+' },
  { icon: Award, label: 'Hackathons Won', value: '5' },
  { icon: BookOpen, label: 'Research Papers', value: '2' },
  { icon: Heart, label: 'Coffees Consumed', value: '∞' },
];

export default function AboutPage() {
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
              About Me
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I&apos;m a Computer Science student at the University of Michigan with a
            passion for building intelligent systems that make a real-world impact.
            My work focuses on the intersection of AI, robotics, and healthcare
            technology.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-purple-600 dark:text-purple-400" />
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass rounded-3xl p-8 md:p-12 mb-20"
        >
          <h2 className="text-3xl font-bold mb-6">My Journey</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              My fascination with technology began when I first learned to solve a
              Rubik&apos;s Cube. The elegant algorithms and problem-solving approach
              sparked my interest in computer science and led me to pursue a degree
              at the University of Michigan.
            </p>
            <p>
              At Michigan, I&apos;ve had the opportunity to work on cutting-edge
              research in surgical robotics and computer vision. I&apos;m particularly
              interested in how AI can be applied to improve healthcare outcomes and
              make medical procedures safer and more accessible.
            </p>
            <p>
              Beyond academics, I&apos;m an active member of the robotics club,
              competitive speedcuber, and avid hiker. I believe that diverse
              experiences and perspectives make us better engineers and problem
              solvers.
            </p>
            <p>
              I&apos;m always excited to collaborate on projects that push the
              boundaries of what&apos;s possible with technology. Feel free to reach
              out if you&apos;d like to work together!
            </p>
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-8">Education</h2>
          <div className="glass rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🎓</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-michigan-blue dark:text-michigan-maize mb-2">
                  University of Michigan
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                  Bachelor of Science in Computer Science
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Expected Graduation: May 2026
                </p>
                <div className="space-y-1 text-gray-700 dark:text-gray-300">
                  <p>• GPA: 3.9/4.0</p>
                  <p>
                    • Relevant Coursework: Machine Learning, Computer Vision, Robotics,
                    Data Structures & Algorithms
                  </p>
                  <p>• Dean&apos;s List: All Semesters</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Photo Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-8">Captured Moments</h2>
          <PhotoGallery photos={photos} />
        </motion.div>
      </div>
    </div>
  );
}


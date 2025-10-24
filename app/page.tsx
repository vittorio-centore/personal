'use client';

import { motion } from 'framer-motion';
import HeroCube from '@/components/HeroCube';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl w-full"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Hi, I&apos;m{' '}
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  Vittorio
                </span>
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full" />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed"
            >
              CS student at{' '}
              <span className="font-semibold text-michigan-blue dark:text-michigan-maize">
                University of Michigan
              </span>{' '}
              building AI-powered experiences at the intersection of robotics,
              healthcare, and human-computer interaction.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="group px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium flex items-center gap-2 hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                View My Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 glass rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                About Me
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex gap-4 pt-4"
            >
              <a
                href="https://github.com/vittorioc"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass rounded-full hover:scale-110 transition-transform"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/vittorioc"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass rounded-full hover:scale-110 transition-transform"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:vittorio@umich.edu"
                className="p-3 glass rounded-full hover:scale-110 transition-transform"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </motion.div>
          </div>

          {/* Right side - Interactive cube */}
          <motion.div variants={itemVariants}>
            <HeroCube />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          variants={itemVariants}
          className="mt-20 flex flex-col items-center gap-2 text-gray-400"
        >
          <p className="text-sm">Scroll to explore</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-gray-400 rounded-full p-1"
          >
            <div className="w-1 h-3 bg-gray-400 rounded-full mx-auto" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}


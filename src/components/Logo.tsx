import React from 'react';
import { motion } from 'framer-motion';

export const Logo: React.FC = () => {
  const letterVariants = {
    initial: { y: 20, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    }),
  };

  const letters = "Ligator".split("");

  return (
    <motion.div 
      className="mb-8 pt-4"
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
    >
      <div className="relative inline-block">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="font-cursive text-7xl inline-block pb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400"
            variants={letterVariants}
            initial="initial"
            animate="animate"
            custom={i}
            whileHover={{
              y: -5,
              transition: { duration: 0.2 }
            }}
          >
            {letter}
          </motion.span>
        ))}
        <motion.div
          className="absolute -bottom-2 left-0 right-0 h-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        />
      </div>
    </motion.div>
  );
};
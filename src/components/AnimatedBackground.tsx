import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-indigo-950 dark:to-purple-950"
        animate={{
          background: [
            'linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-via), var(--tw-gradient-to))',
            'linear-gradient(to top right, var(--tw-gradient-from), var(--tw-gradient-via), var(--tw-gradient-to))',
            'linear-gradient(to bottom left, var(--tw-gradient-from), var(--tw-gradient-via), var(--tw-gradient-to))',
            'linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-via), var(--tw-gradient-to))',
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-indigo-200 dark:bg-indigo-700"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            whileHover={{ scale: 2, opacity: 0.8 }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
              x: [0, Math.random() * 20 - 10, 0],
              y: [0, Math.random() * 20 - 10, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};
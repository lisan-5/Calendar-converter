import React from 'react';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface YearInputProps {
  year: number;
  onChange: (year: number) => void;
}

export const YearInput: React.FC<YearInputProps> = ({ year, onChange }) => {
  return (
    <motion.div 
      className="flex items-center gap-4 mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="relative flex-1 max-w-xs">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Calendar className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
        </div>
        <input
          type="number"
          value={year}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          className="block w-full pl-10 pr-4 py-2 border border-indigo-200 dark:border-indigo-800 
                   bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm
                   text-slate-900 dark:text-slate-100
                   rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                   transition-colors duration-200"
          placeholder="Enter year..."
          min="1"
          max="9999"
        />
      </div>
    </motion.div>
  );
};
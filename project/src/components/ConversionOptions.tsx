import React from 'react';
import { Calendar, CalendarDays, CalendarRange } from 'lucide-react';
import { motion } from 'framer-motion';

export type ConversionType = 'year' | 'month' | 'day';

interface ConversionOptionsProps {
  selected: ConversionType;
  onSelect: (type: ConversionType) => void;
}

export const ConversionOptions: React.FC<ConversionOptionsProps> = ({ selected, onSelect }) => {
  const options = [
    { id: 'year', label: 'Year', icon: CalendarRange, description: 'View all months' },
    { id: 'month', label: 'Month', icon: CalendarDays, description: 'View specific month' },
    { id: 'day', label: 'Day', icon: Calendar, description: 'View specific day' },
  ] as const;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {options.map(({ id, label, icon: Icon, description }) => (
        <motion.button
          key={id}
          onClick={() => onSelect(id as ConversionType)}
          className={`
            p-6 rounded-xl border transition-all duration-300
            ${selected === id
              ? 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-300 shadow-lg'
              : 'bg-white/80 border-slate-200 hover:border-indigo-300 hover:shadow-md'
            }
          `}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div 
            className="flex flex-col items-center gap-3"
            initial={false}
            animate={{
              y: selected === id ? -5 : 0
            }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{
                rotate: selected === id ? [0, 15, -15, 0] : 0,
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1]
              }}
            >
              <Icon className={`w-8 h-8 ${
                selected === id 
                  ? 'text-indigo-600' 
                  : 'text-slate-600'
              }`} />
            </motion.div>
            <span className={`font-medium text-lg ${
              selected === id
                ? 'text-indigo-900'
                : 'text-slate-900'
            }`}>
              {label}
            </span>
            <span className="text-sm text-slate-600">
              {description}
            </span>
          </motion.div>
        </motion.button>
      ))}
    </div>
  );
};
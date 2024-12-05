import React from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GREGORIAN_MONTHS } from '../utils/calendarConverter';

interface DateInputsProps {
  year: number;
  month: number;
  day: number;
  conversionType: 'year' | 'month' | 'day';
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
  onDayChange: (day: number) => void;
}

export const DateInputs: React.FC<DateInputsProps> = ({
  year,
  month,
  day,
  conversionType,
  onYearChange,
  onMonthChange,
  onDayChange,
}) => {
  const [isMonthOpen, setIsMonthOpen] = React.useState(false);
  const [isDayOpen, setIsDayOpen] = React.useState(false);
  const monthRef = React.useRef<HTMLDivElement>(null);
  const dayRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (monthRef.current && !monthRef.current.contains(event.target as Node)) {
        setIsMonthOpen(false);
      }
      if (dayRef.current && !dayRef.current.contains(event.target as Node)) {
        setIsDayOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const daysInMonth = React.useMemo(() => {
    return new Date(year, month + 1, 0).getDate();
  }, [year, month]);

  return (
    <motion.div 
      className="flex flex-wrap items-center gap-4 mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="relative flex-1 min-w-[200px]">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Calendar className="h-5 w-5 text-indigo-500" />
        </div>
        <input
          type="number"
          value={year}
          onChange={(e) => onYearChange(parseInt(e.target.value, 10))}
          className="block w-full pl-10 pr-4 py-2 border border-indigo-200 
                   bg-white/90 backdrop-blur-sm
                   text-slate-900 rounded-lg 
                   focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                   transition-all duration-200 hover:border-indigo-400"
          placeholder="Enter year..."
          min="1"
          max="9999"
        />
      </div>

      {conversionType !== 'year' && (
        <div className="relative min-w-[200px]" ref={monthRef}>
          <button
            onClick={() => setIsMonthOpen(!isMonthOpen)}
            className="w-full px-4 py-2 border border-indigo-200 rounded-lg
                     bg-white/90 backdrop-blur-sm text-left
                     focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                     transition-all duration-200 hover:border-indigo-400
                     flex items-center justify-between"
          >
            <span>{GREGORIAN_MONTHS[month]}</span>
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </button>

          <AnimatePresence>
            {isMonthOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-indigo-100 max-h-60 overflow-auto"
              >
                {GREGORIAN_MONTHS.map((monthName, index) => (
                  <motion.button
                    key={monthName}
                    whileHover={{ backgroundColor: 'rgba(99, 102, 241, 0.1)' }}
                    onClick={() => {
                      onMonthChange(index);
                      setIsMonthOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:text-indigo-600 transition-colors"
                  >
                    {monthName}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {conversionType === 'day' && (
        <div className="relative min-w-[100px]" ref={dayRef}>
          <button
            onClick={() => setIsDayOpen(!isDayOpen)}
            className="w-full px-4 py-2 border border-indigo-200 rounded-lg
                     bg-white/90 backdrop-blur-sm text-left
                     focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                     transition-all duration-200 hover:border-indigo-400
                     flex items-center justify-between"
          >
            <span>{day}</span>
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </button>

          <AnimatePresence>
            {isDayOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-indigo-100 max-h-60 overflow-auto"
              >
                <div className="grid grid-cols-7 gap-1 p-2">
                  {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => (
                    <motion.button
                      key={d}
                      whileHover={{ scale: 1.1 }}
                      onClick={() => {
                        onDayChange(d);
                        setIsDayOpen(false);
                      }}
                      className="w-8 h-8 flex items-center justify-center rounded-full
                               hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
                    >
                      {d}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};
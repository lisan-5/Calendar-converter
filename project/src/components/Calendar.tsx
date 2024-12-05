import React from 'react';
import { CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';
import { ETHIOPIAN_MONTHS, ETHIOPIAN_MONTHS_LATIN } from '../utils/calendarConverter';
import { getEthiopianYearRange } from '../utils/dateUtils';

interface CalendarProps {
  year: number;
  month: number;
  gregorianDays: number[];
  ethiopianDays: number[];
  startDay: number;
}

export const Calendar: React.FC<CalendarProps> = ({
  year,
  month,
  gregorianDays,
  ethiopianDays,
  startDay,
}) => {
  const weeks = Math.ceil((startDay + gregorianDays.length) / 7);
  const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });
  const ethiopianMonthIndex = (month + 4) % 13;
  const { start: ethiopianYearStart, end: ethiopianYearEnd } = getEthiopianYearRange(year);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-indigo-100 dark:border-indigo-900"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <CalendarDays className="w-5 h-5" />
          <div>
            <div className="flex items-baseline gap-2">
              <span>{monthName} {year}</span>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                (የግ: {ethiopianYearStart}-{ethiopianYearEnd})
              </span>
            </div>
            <div className="text-sm text-indigo-600 dark:text-indigo-400">
              {ETHIOPIAN_MONTHS[ethiopianMonthIndex]} ({ETHIOPIAN_MONTHS_LATIN[ethiopianMonthIndex]})
            </div>
          </div>
        </h3>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="text-center py-2 text-sm font-medium text-slate-600 dark:text-slate-400"
          >
            {day}
          </div>
        ))}
        
        {Array.from({ length: weeks * 7 }).map((_, index) => {
          const dayIndex = index - startDay;
          const gregorianDay = gregorianDays[dayIndex];
          const ethiopianDay = ethiopianDays[dayIndex];
          const isValidDay = dayIndex >= 0 && dayIndex < gregorianDays.length;

          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className={`
                border dark:border-slate-700 rounded-lg p-2 min-h-[80px]
                ${isValidDay 
                  ? 'bg-white dark:bg-slate-700' 
                  : 'bg-slate-50 dark:bg-slate-800'}
              `}
            >
              {isValidDay && (
                <>
                  <div className="text-right text-slate-900 dark:text-slate-200">
                    {gregorianDay}
                  </div>
                  <div className="text-sm text-indigo-600 dark:text-indigo-400 mt-1">
                    {ethiopianDay}
                  </div>
                </>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from './components/Calendar';
import { DateInputs } from './components/DateInputs';
import { Logo } from './components/Logo';
import { AnimatedBackground } from './components/AnimatedBackground';
import { ConversionOptions, ConversionType } from './components/ConversionOptions';
import {
  GREGORIAN_MONTHS,
  getLeapYearOffset,
  determineLeapYears,
  getInitialEthiopianDate,
} from './utils/calendarConverter';

function App() {
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(new Date().getMonth());
  const [day, setDay] = useState(new Date().getDate());
  const [conversionType, setConversionType] = useState<ConversionType>('year');

  const calendarData = useMemo(() => {
    const leapYearOffset = getLeapYearOffset(year);
    const { isJulianCalendar, isLeapYear } = determineLeapYears(year);
    const { month: ethiopianMonth, day: ethiopianDay } = getInitialEthiopianDate(
      isLeapYear,
      isJulianCalendar,
      leapYearOffset
    );

    const monthsData = GREGORIAN_MONTHS.map((_, monthIndex) => {
      const date = new Date(year, monthIndex, 1);
      const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
      const startDay = date.getDay();

      const gregorianDays = Array.from(
        { length: daysInMonth },
        (_, i) => i + 1
      );

      const ethiopianDays = Array.from(
        { length: daysInMonth },
        (_, i) => ((ethiopianDay + i - 1) % 30) + 1
      );

      return {
        month: monthIndex,
        startDay,
        gregorianDays,
        ethiopianDays,
      };
    });

    return monthsData;
  }, [year]);

  const displayedCalendars = useMemo(() => {
    switch (conversionType) {
      case 'year':
        return calendarData;
      case 'month':
        return [calendarData[month]];
      case 'day':
        return [{
          ...calendarData[month],
          gregorianDays: [day],
          ethiopianDays: [calendarData[month].ethiopianDays[day - 1]],
        }];
      default:
        return calendarData;
    }
  }, [calendarData, conversionType, month, day]);

  return (
    <div className="min-h-screen bg-transparent">
      <AnimatedBackground />
      
      <div className="py-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Logo />
            <motion.p 
              className="text-lg text-slate-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Convert between Gregorian and Ethiopian (Ge'ez) calendars
            </motion.p>
          </motion.div>

          <ConversionOptions selected={conversionType} onSelect={setConversionType} />
          <DateInputs
            year={year}
            month={month}
            day={day}
            conversionType={conversionType}
            onYearChange={setYear}
            onMonthChange={setMonth}
            onDayChange={setDay}
          />

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {displayedCalendars.map((data) => (
              <Calendar
                key={data.month}
                year={year}
                month={data.month}
                startDay={data.startDay}
                gregorianDays={data.gregorianDays}
                ethiopianDays={data.ethiopianDays}
              />
            ))}
          </motion.div>

          <motion.footer
            className="text-center mt-12 text-slate-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            © 2024 Lisanegebriel Abay Kebedew. All Rights Reserved
          </motion.footer>
        </div>
      </div>
    </div>
  );
}

export default App;
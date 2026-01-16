import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  addDays, 
  isSameMonth, 
  isSameDay,
  format,
  startOfYear,
  endOfYear,
  eachMonthOfInterval,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  startOfDay,
  endOfDay
} from 'date-fns';
import { CalendarEvent } from '../types/calendar';

export const getMonthDays = (date: Date) => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = [];
  let currentDay = startDate;

  while (currentDay <= endDate) {
    days.push(currentDay);
    currentDay = addDays(currentDay, 1);
  }

  return days;
};

export const getWeekDays = (date: Date) => {
  const start = startOfWeek(date);
  const days = [];
  
  for (let i = 0; i < 7; i++) {
    days.push(addDays(start, i));
  }
  
  return days;
};

export const getYearMonths = (date: Date) => {
  const yearStart = startOfYear(date);
  const yearEnd = endOfYear(date);
  return eachMonthOfInterval({ start: yearStart, end: yearEnd });
};

export const getEventsForDate = (events: CalendarEvent[], date: Date) => {
  return events.filter(event => {
    const eventStart = startOfDay(event.startDate);
    const eventEnd = endOfDay(event.endDate);
    const checkDate = startOfDay(date);
    
    return checkDate >= eventStart && checkDate <= eventEnd;
  });
};

export const getEventsForDateRange = (events: CalendarEvent[], start: Date, end: Date) => {
  return events.filter(event => {
    const eventStart = startOfDay(event.startDate);
    const eventEnd = endOfDay(event.endDate);
    const rangeStart = startOfDay(start);
    const rangeEnd = endOfDay(end);
    
    return (eventStart >= rangeStart && eventStart <= rangeEnd) ||
           (eventEnd >= rangeStart && eventEnd <= rangeEnd) ||
           (eventStart <= rangeStart && eventEnd >= rangeEnd);
  });
};

export const formatDateRange = (start: Date, end: Date) => {
  if (isSameDay(start, end)) {
    return format(start, 'MMM d, yyyy');
  }
  
  if (format(start, 'MMM yyyy') === format(end, 'MMM yyyy')) {
    return `${format(start, 'MMM d')}-${format(end, 'd, yyyy')}`;
  }
  
  return `${format(start, 'MMM d, yyyy')} - ${format(end, 'MMM d, yyyy')}`;
};

export const navigateDate = (date: Date, view: string, direction: 'prev' | 'next') => {
  const increment = direction === 'next' ? 1 : -1;
  
  switch (view) {
    case 'month':
      return direction === 'next' ? addMonths(date, 1) : subMonths(date, 1);
    case 'week':
      return direction === 'next' ? addWeeks(date, 1) : subWeeks(date, 1);
    case 'day':
      return addDays(date, increment);
    case 'year':
      return addMonths(date, increment * 12);
    default:
      return date;
  }
};

import { Injectable } from '@angular/core';
import { CalendarView, CalendarEvent } from '../types/calendar';
import { 
  addMonths, 
  subMonths, 
  addWeeks, 
  subWeeks, 
  addDays, 
  subDays,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameDay,
  isSameMonth as dateFnsIsSameMonth,
  eachDayOfInterval,
  format,
  startOfYear,
  endOfYear,
  eachMonthOfInterval,
  startOfDay,
  endOfDay
} from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  generateMockEvents(): CalendarEvent[] {
    const today = new Date();
    return [
      {
        id: '1',
        title: 'Team Meeting',
        description: 'Weekly team sync to discuss project progress and upcoming tasks',
        startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
        endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0),
        category: '1',
        type: 'event',
        location: 'Conference Room A'
      },
      {
        id: '2',
        title: 'Project Deadline',
        description: 'Submit final project deliverables',
        startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3, 17, 0),
        endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3, 17, 0),
        category: '1',
        type: 'task',
        isCompleted: false
      },
      {
        id: '3',
        title: 'Lunch with Client',
        description: 'Discuss new project requirements',
        startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 12, 0),
        endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 13, 30),
        category: '2',
        type: 'event',
        location: 'Downtown Restaurant'
      }
    ];
  }

  navigateDate(date: Date, view: CalendarView, direction: 'prev' | 'next'): Date {
    switch (view) {
      case 'month':
        return direction === 'prev' ? subMonths(date, 1) : addMonths(date, 1);
      case 'week':
        return direction === 'prev' ? subWeeks(date, 1) : addWeeks(date, 1);
      case 'day':
        return direction === 'prev' ? subDays(date, 1) : addDays(date, 1);
      case 'year':
        return direction === 'prev' ? subMonths(date, 12) : addMonths(date, 12);
      case 'agenda':
        return date;
      default:
        return date;
    }
  }

  getMonthDays(date: Date): Date[] {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    return eachDayOfInterval({ start: startDate, end: endDate });
  }

  getWeekDays(date: Date): Date[] {
    const start = startOfWeek(date);
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }

  getYearMonths(date: Date): Date[] {
    const start = startOfYear(date);
    const end = endOfYear(date);
    return eachMonthOfInterval({ start, end });
  }

  getEventsForDate(events: CalendarEvent[], date: Date): CalendarEvent[] {
    return events.filter(event => 
      isSameDay(startOfDay(event.startDate), startOfDay(date))
    );
  }

  getEventsForRange(events: CalendarEvent[], startDate: Date, endDate: Date): CalendarEvent[] {
    return events.filter(event =>
      event.startDate >= startDate && event.startDate <= endDate
    );
  }

  getHoursInDay(): number[] {
    return Array.from({ length: 24 }, (_, i) => i);
  }

  formatTime(date: Date): string {
    return format(date, 'h:mm a');
  }

  formatDate(date: Date): string {
    return format(date, 'MMMM d, yyyy');
  }

  formatDateFull(date: Date): string {
    return format(date, 'EEEE, MMMM d, yyyy');
  }

  isToday(date: Date): boolean {
    return isSameDay(date, new Date());
  }

  isSameMonth(date1: Date, date2: Date): boolean {
    return dateFnsIsSameMonth(date1, date2);
  }
}

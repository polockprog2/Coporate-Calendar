export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  category: string;
  type: 'event' | 'task' | 'venue';
  location?: string;
  isCompleted?: boolean;
  attendees?: string[];
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface Label {
  id: string;
  name: string;
  color: string;
}

export type CalendarView = 'month' | 'week' | 'day' | 'year' | 'agenda';

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  timezone: string;
}

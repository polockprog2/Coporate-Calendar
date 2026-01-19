import { User } from './user.model';

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  location?: string;
  attendees: User[];
  color: string;
  type: 'meeting' | 'deadline' | 'task' | 'reminder';
  taskId?: string;
  createdBy: string;
  createdAt: Date;
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CalendarEvent } from '../models/calendar-event.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private events$ = new BehaviorSubject<CalendarEvent[]>([
    {
      id: '1',
      title: 'Team Meeting',
      description: 'Weekly sync',
      startTime: new Date(2024, 0, 15, 10, 0),
      endTime: new Date(2024, 0, 15, 11, 0),
      location: 'Conference Room A',
      attendees: [],
      color: '#3b82f6',
      type: 'meeting',
      createdBy: 'user1',
      createdAt: new Date()
    }
  ]);
  
  private selectedDate$ = new BehaviorSubject<Date>(new Date());

  getEvents(): Observable<CalendarEvent[]> {
    return this.events$.asObservable();
  }

  getSelectedDate(): Observable<Date> {
    return this.selectedDate$.asObservable();
  }

  setSelectedDate(date: Date): void {
    this.selectedDate$.next(date);
  }

  addEvent(event: CalendarEvent): void {
    const current = this.events$.value;
    this.events$.next([...current, event]);
  }

  updateEvent(id: string, updates: Partial<CalendarEvent>): void {
    const current = this.events$.value;
    const updated = current.map(e => e.id === id ? { ...e, ...updates } : e);
    this.events$.next(updated);
  }

  deleteEvent(id: string): void {
    const current = this.events$.value;
    this.events$.next(current.filter(e => e.id !== id));
  }

  getEventsByDateRange(start: Date, end: Date): CalendarEvent[] {
    return this.events$.value.filter(e => 
      e.startTime >= start && e.startTime <= end
    );
  }
}

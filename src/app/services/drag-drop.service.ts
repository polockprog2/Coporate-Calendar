import { Injectable } from '@angular/core';
import { CalendarEvent } from '../types/calendar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {
  private draggedEvent$ = new Subject<CalendarEvent | null>();
  draggedEvent$$ = this.draggedEvent$.asObservable();
  private draggedEvent: CalendarEvent | null = null;

  setDraggedEvent(event: CalendarEvent | null): void {
    this.draggedEvent = event;
    this.draggedEvent$.next(event);
  }

  getDraggedEvent(): CalendarEvent | null {
    return this.draggedEvent;
  }

  calculateNewEventTime(date: Date, hour: number, minute: number = 0): Date {
    const newDate = new Date(date);
    newDate.setHours(hour, minute, 0, 0);
    return newDate;
  }
}

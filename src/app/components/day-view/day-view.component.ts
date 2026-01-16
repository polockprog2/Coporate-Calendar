import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarEvent, Category } from '../../types/calendar';
import { CalendarService } from '../../services/calendar.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-day-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex-1 bg-white overflow-hidden flex flex-col">
      <!-- Day Header -->
      <div class="border-b bg-white p-4">
        <h2 class="text-2xl font-bold">{{ format(currentDate, 'EEEE, MMMM d, yyyy') }}</h2>
      </div>

      <!-- Time Grid -->
      <div class="flex-1 overflow-auto">
        <div class="grid grid-cols-2 gap-4">
          <!-- Time Column -->
          <div class="border-r bg-gray-50 p-4">
            <div *ngFor="let hour of hours" class="h-20 border-b text-sm text-gray-600 pb-2 text-right">
              {{ formatHour(hour) }}
            </div>
          </div>

          <!-- Events Column -->
          <div class="p-4 relative">
            <div *ngFor="let hour of hours" class="h-20 border-b relative">
              <button
                *ngFor="let event of getEventsForDayAndHour(currentDate, hour)"
                (click)="eventClick.emit(event)"
                class="absolute left-0 right-0 mx-2 px-3 py-2 text-sm font-medium text-white rounded hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
                [style.backgroundColor]="getCategoryColor(event.category)"
                [style.top.%]="getEventPosition(event, hour)"
                [style.height.%]="getEventHeight(event)"
              >
                <div class="font-semibold">{{ event.title }}</div>
                <div class="text-xs">{{ formatTime(event.startDate) }} - {{ formatTime(event.endDate) }}</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DayViewComponent implements OnInit {
  @Input() currentDate!: Date;
  @Input() events: CalendarEvent[] = [];
  @Input() categories: Category[] = [];
  @Output() eventClick = new EventEmitter<CalendarEvent>();

  hours: number[] = [];

  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    this.hours = this.calendarService.getHoursInDay();
  }

  getEventsForDayAndHour(day: Date, hour: number): CalendarEvent[] {
    return this.calendarService.getEventsForDate(this.events, day).filter(event => {
      const eventHour = event.startDate.getHours();
      return eventHour === hour;
    });
  }

  getCategoryColor(categoryId: string): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category?.color || '#3b82f6';
  }

  getEventPosition(event: CalendarEvent, hour: number): number {
    const eventHour = event.startDate.getHours();
    const minutes = event.startDate.getMinutes();
    if (eventHour !== hour) return 0;
    return (minutes / 60) * 100;
  }

  getEventHeight(event: CalendarEvent): number {
    const duration = (event.endDate.getTime() - event.startDate.getTime()) / (1000 * 60);
    return Math.max(40, (duration / 60) * 100);
  }

  formatHour(hour: number): string {
    const date = new Date();
    date.setHours(hour, 0, 0, 0);
    return format(date, 'ha');
  }

  formatTime(date: Date): string {
    return format(date, 'h:mm a');
  }

  format = format;
}

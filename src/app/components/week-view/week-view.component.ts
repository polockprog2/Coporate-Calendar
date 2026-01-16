import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarEvent, Category } from '../../types/calendar';
import { CalendarService } from '../../services/calendar.service';
import { DragDropService } from '../../services/drag-drop.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-week-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex-1 bg-white overflow-hidden flex flex-col">
      <!-- Day Headers -->
      <div class="grid grid-cols-8 border-b sticky top-0 bg-white z-10">
        <div class="col-span-1"></div>
        <div
          *ngFor="let day of weekDays"
          class="col-span-1 p-3 text-center text-sm font-semibold text-gray-600 border-l"
        >
          <div>{{ format(day, 'E') }}</div>
          <div class="text-lg font-bold">{{ format(day, 'd') }}</div>
        </div>
      </div>

      <!-- All-Day Events Section -->
      <div class="grid grid-cols-8 border-b bg-gray-50">
        <div class="col-span-1 p-2 text-xs text-gray-500 font-semibold">All Day</div>
        <div *ngFor="let day of weekDays" class="col-span-1 border-l p-2 min-h-12 flex flex-wrap gap-1 content-start">
          <button *ngFor="let event of getAllDayEventsForDay(day)"
                  (click)="eventClick.emit(event)"
                  class="w-full text-left px-2 py-1 text-xs rounded text-white truncate hover:shadow-md transition-shadow"
                  [style.backgroundColor]="getCategoryColor(event.category)"
                  [title]="event.title">
            {{ event.title }}
          </button>
        </div>
      </div>

      <!-- Time Grid -->
      <div class="grid grid-cols-8 flex-1 overflow-auto">
        <!-- Time Column -->
        <div class="col-span-1 border-r bg-gray-50 sticky left-0 z-5">
          <div *ngFor="let hour of hours" class="h-16 border-b text-xs text-gray-500 p-1 text-right">
            {{ formatHour(hour) }}
          </div>
        </div>

        <!-- Day Columns -->
        <div
          *ngFor="let day of weekDays"
          class="col-span-1 border-l relative"
          (drop)="onDrop($event, day)"
          (dragover)="onDragOver($event)"
          (dragleave)="onDragLeave($event)"
        >
          <div *ngFor="let hour of hours" 
               class="h-16 border-b relative hover:bg-blue-50 transition-colors cursor-pointer"
               (click)="onTimeSlotClick(day, hour)">
            <button
              *ngFor="let event of getEventsForDayAndHour(day, hour)"
              draggable="true"
              (click)="$event.stopPropagation(); eventClick.emit(event)"
              (dragstart)="dragDropService.setDraggedEvent(event)"
              (dragend)="dragDropService.setDraggedEvent(null)"
              class="absolute left-0 right-0 mx-1 px-2 py-1 text-xs font-medium text-white rounded hover:shadow-lg transition-all cursor-move overflow-hidden"
              [style.backgroundColor]="getCategoryColor(event.category)"
              [style.top.%]="getEventPosition(event, hour)"
              [style.height.%]="getEventHeight(event)"
              [title]="event.title + ' (' + formatTime(event.startDate) + ' - ' + formatTime(event.endDate) + ')'"
            >
              <div class="font-semibold truncate">{{ event.title }}</div>
              <div class="text-xs">{{ formatTime(event.startDate) }}</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class WeekViewComponent implements OnInit, OnChanges {
  @Input() currentDate!: Date;
  @Input() events: CalendarEvent[] = [];
  @Input() categories: Category[] = [];
  @Output() eventClick = new EventEmitter<CalendarEvent>();
  @Output() eventMoved = new EventEmitter<{ event: CalendarEvent; newDate: Date }>();
  @Output() eventCreated = new EventEmitter<{ date: Date; hour: number }>();

  weekDays: Date[] = [];
  hours: number[] = [];

  constructor(
    private calendarService: CalendarService,
    public dragDropService: DragDropService
  ) {}

  ngOnInit() {
    this.updateWeek();
    this.hours = this.calendarService.getHoursInDay();
  }

  ngOnChanges() {
    this.updateWeek();
  }

  private updateWeek() {
    this.weekDays = this.calendarService.getWeekDays(this.currentDate);
  }

  getAllDayEventsForDay(day: Date): CalendarEvent[] {
    return this.calendarService.getEventsForDate(this.events, day).filter(event => {
      const duration = event.endDate.getTime() - event.startDate.getTime();
      return duration >= 24 * 60 * 60 * 1000;
    });
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
    return Math.max(30, (duration / 60) * 100);
  }

  formatHour(hour: number): string {
    const date = new Date();
    date.setHours(hour, 0, 0, 0);
    return format(date, 'ha');
  }

  formatTime(date: Date): string {
    return format(date, 'h:mm a');
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.dataTransfer!.dropEffect = 'move';
    const target = event.target as HTMLElement;
    target.closest('.col-span-1')?.classList.add('bg-blue-100');
  }

  onDragLeave(event: DragEvent): void {
    const target = event.target as HTMLElement;
    target.closest('.col-span-1')?.classList.remove('bg-blue-100');
  }

  onDrop(event: DragEvent, day: Date): void {
    event.preventDefault();
    const draggedEvent = this.dragDropService.getDraggedEvent();
    if (draggedEvent) {
      const rect = (event.target as HTMLElement).closest('.col-span-1')?.getBoundingClientRect();
      if (rect) {
        const y = event.clientY - rect.top;
        const hour = Math.floor((y / rect.height) * 24);
        const newDate = this.dragDropService.calculateNewEventTime(day, hour);
        this.eventMoved.emit({ event: draggedEvent, newDate });
      }
    }
    (event.target as HTMLElement).closest('.col-span-1')?.classList.remove('bg-blue-100');
  }

  onTimeSlotClick(day: Date, hour: number): void {
    this.eventCreated.emit({ date: day, hour });
  }

  format = format;
}

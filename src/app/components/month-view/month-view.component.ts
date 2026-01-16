import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarEvent, Category } from '../../types/calendar';
import { CalendarService } from '../../services/calendar.service';
import { format, isSameMonth, isToday } from 'date-fns';

@Component({
  selector: 'app-month-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex-1 bg-white">
      <!-- Week Day Headers -->
      <div class="grid grid-cols-7 border-b">
        <div
          *ngFor="let day of weekDays"
          class="py-3 text-center text-sm font-semibold text-gray-600 border-r last:border-r-0"
        >
          {{ day }}
        </div>
      </div>

      <!-- Calendar Grid -->
      <div class="grid grid-cols-7 auto-rows-fr h-[calc(100vh-240px)]">
        <div
          *ngFor="let day of monthDays; let i = index"
          (click)="dateClick.emit(day)"
          [class.bg-gray-50]="!isSameMonth(day, currentDate)"
          class="border-r border-b last:border-r-0 p-2 cursor-pointer transition-colors hover:bg-gray-50"
        >
          <div class="flex flex-col h-full">
            <div class="text-sm mb-1">
              <span
                [class.font-bold]="isToday(day) && isSameMonth(day, currentDate)"
                [class.text-gray-400]="!isSameMonth(day, currentDate)"
                [class.text-gray-700]="isSameMonth(day, currentDate) && !isToday(day)"
                [class.bg-gradient-to-r]="isToday(day)"
                [class.from-blue-600]="isToday(day)"
                [class.to-purple-600]="isToday(day)"
                [class.text-white]="isToday(day)"
                [class.inline-flex]="isToday(day)"
                [class.items-center]="isToday(day)"
                [class.justify-center]="isToday(day)"
                [class.w-7]="isToday(day)"
                [class.h-7]="isToday(day)"
                [class.rounded-full]="isToday(day)"
              >
                {{ format(day, 'd') }}
              </span>
            </div>
            <div class="flex-1 overflow-y-auto space-y-1">
              <button
                *ngFor="let event of getDayEvents(day).slice(0, 3)"
                (click)="$event.stopPropagation(); eventClick.emit(event)"
                class="w-full text-left px-2 py-1 rounded text-xs font-medium text-white truncate transition-transform hover:scale-105"
                [style.backgroundColor]="getCategoryColor(event.category)"
              >
                {{ event.title }}
              </button>
              <div *ngIf="getDayEvents(day).length > 3" class="text-xs text-gray-500 px-2">
                +{{ getDayEvents(day).length - 3 }} more
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class MonthViewComponent implements OnInit, OnChanges {
  @Input() currentDate!: Date;
  @Input() events: CalendarEvent[] = [];
  @Input() categories: Category[] = [];
  @Output() eventClick = new EventEmitter<CalendarEvent>();
  @Output() dateClick = new EventEmitter<Date>();

  monthDays: Date[] = [];
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    this.updateCalendar();
  }

  ngOnChanges() {
    this.updateCalendar();
  }

  private updateCalendar() {
    this.monthDays = this.calendarService.getMonthDays(this.currentDate);
  }

  getDayEvents(day: Date): CalendarEvent[] {
    return this.calendarService.getEventsForDate(this.events, day);
  }

  getCategoryColor(categoryId: string): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category?.color || '#3b82f6';
  }

  format = format;
  isSameMonth = isSameMonth;
  isToday = isToday;
}

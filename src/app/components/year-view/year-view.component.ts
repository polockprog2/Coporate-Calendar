import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarEvent } from '../../types/calendar';
import { CalendarService } from '../../services/calendar.service';
import { format, isSameMonth } from 'date-fns';

@Component({
  selector: 'app-year-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex-1 bg-white overflow-auto p-6">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold mb-8 text-center">{{ format(currentDate, 'yyyy') }}</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            *ngFor="let month of months"
            class="border rounded-lg p-4 bg-white hover:shadow-lg transition-shadow"
          >
            <h3 class="text-lg font-semibold mb-4">{{ format(month, 'MMMM') }}</h3>
            
            <div class="grid grid-cols-7 gap-2 text-center">
              <div *ngFor="let day of weekDays" class="text-xs font-semibold text-gray-600">
                {{ day }}
              </div>

              <button
                *ngFor="let day of getMonthDays(month)"
                (click)="dateClick.emit(day)"
                [class.bg-blue-100]="hasEventsOnDay(day)"
                [class.font-bold]="hasEventsOnDay(day)"
                class="text-xs p-1 rounded hover:bg-gray-100 transition-colors"
              >
                {{ format(day, 'd') }}
              </button>
            </div>

            <div *ngIf="getMonthEvents(month).length > 0" class="mt-4 pt-4 border-t">
              <div class="text-xs text-gray-600 space-y-1">
                <div *ngFor="let event of getMonthEvents(month).slice(0, 3)" class="truncate">
                  <span class="inline-block w-2 h-2 rounded-full mr-1"
                        [style.backgroundColor]="getCategoryColor(event.category)"></span>
                  {{ event.title }}
                </div>
                <div *ngIf="getMonthEvents(month).length > 3" class="text-gray-500">
                  +{{ getMonthEvents(month).length - 3 }} more
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class YearViewComponent implements OnInit, OnChanges {
  @Input() currentDate!: Date;
  @Input() events: CalendarEvent[] = [];
  @Input() categories: { id: string; name: string; color: string }[] = [];
  @Output() dateClick = new EventEmitter<Date>();

  months: Date[] = [];
  weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    this.updateYear();
  }

  ngOnChanges() {
    this.updateYear();
  }

  private updateYear() {
    this.months = this.calendarService.getYearMonths(this.currentDate);
  }

  getMonthDays(month: Date): Date[] {
    return this.calendarService.getMonthDays(month).slice(0, 35);
  }

  getMonthEvents(month: Date): CalendarEvent[] {
    return this.events.filter(event => isSameMonth(event.startDate, month));
  }

  hasEventsOnDay(day: Date): boolean {
    return this.calendarService.getEventsForDate(this.events, day).length > 0;
  }

  getCategoryColor(categoryId: string): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category?.color || '#3b82f6';
  }

  format = format;
}

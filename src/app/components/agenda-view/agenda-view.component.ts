import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarEvent, Category } from '../../types/calendar';
import { CalendarService } from '../../services/calendar.service';
import { format, isSameDay, startOfDay } from 'date-fns';

@Component({
  selector: 'app-agenda-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex-1 bg-white overflow-auto">
      <div class="max-w-4xl mx-auto p-6">
        <div class="space-y-8">
          <ng-container *ngFor="let dateGroup of groupedEvents | keyvalue">
            <div [class.border-blue-600]="isDateToday(dateGroup.key)" 
                 [class.border-gray-200]="!isDateToday(dateGroup.key)"
                 class="sticky top-0 bg-white z-10 pb-2 border-b">
              <h3 [class.text-blue-600]="isDateToday(dateGroup.key)"
                  [class.text-gray-700]="!isDateToday(dateGroup.key)"
                  class="text-lg font-semibold">
                {{ formatDateDisplay(dateGroup.key) }}
                <span *ngIf="isDateToday(dateGroup.key)" class="ml-2 text-sm font-normal">(Today)</span>
              </h3>
            </div>

            <div class="space-y-3">
              <button
                *ngFor="let event of dateGroup.value"
                (click)="eventClick.emit(event)"
                class="w-full text-left p-4 rounded-lg border hover:shadow-md transition-shadow bg-white group"
              >
                <div class="flex items-start space-x-4">
                  <!-- Time -->
                  <div class="flex-shrink-0 w-20 text-sm text-gray-600 pt-1">
                    {{ formatTime(event.startDate) }}
                  </div>

                  <!-- Color Bar -->
                  <div 
                    class="flex-shrink-0 w-1 rounded-full self-stretch"
                    [style.backgroundColor]="getCategoryColor(event.category)"
                  ></div>

                  <!-- Content -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between mb-2">
                      <div class="flex items-center space-x-2">
                        <input
                          *ngIf="event.type === 'task'"
                          type="checkbox"
                          [checked]="event.isCompleted"
                          (click)="$event.stopPropagation(); toggleTask.emit(event.id)"
                          class="cursor-pointer"
                        />
                        <h4 [class.line-through]="event.isCompleted" 
                            class="font-semibold text-gray-900">
                          {{ event.title }}
                        </h4>
                      </div>
                      <span 
                        class="text-xs px-2 py-1 rounded-full text-white"
                        [style.backgroundColor]="getCategoryColor(event.category)"
                      >
                        {{ getCategoryName(event.category) }}
                      </span>
                    </div>

                    <p *ngIf="event.description" class="text-sm text-gray-600 mb-2 line-clamp-2">
                      {{ event.description }}
                    </p>

                    <div class="flex items-center text-xs text-gray-500 space-x-4">
                      <span *ngIf="event.location" class="flex items-center">
                        📍 {{ event.location }}
                      </span>
                      <span *ngIf="!isSameDay(event.startDate, event.endDate)">
                        Ends: {{ formatDateFull(event.endDate) }}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </ng-container>

          <div *ngIf="sortedEvents.length === 0" class="text-center py-12">
            <div class="text-4xl mb-4">📅</div>
            <p class="text-gray-500">No events scheduled</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AgendaViewComponent implements OnInit, OnChanges {
  @Input() events: CalendarEvent[] = [];
  @Input() categories: Category[] = [];
  @Output() eventClick = new EventEmitter<CalendarEvent>();
  @Output() toggleTask = new EventEmitter<string>();

  sortedEvents: CalendarEvent[] = [];
  groupedEvents: { [key: string]: CalendarEvent[] } = {};

  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    this.updateGroupedEvents();
  }

  ngOnChanges() {
    this.updateGroupedEvents();
  }

  private updateGroupedEvents() {
    this.sortedEvents = [...this.events].sort((a, b) => 
      a.startDate.getTime() - b.startDate.getTime()
    );

    this.groupedEvents = {};
    this.sortedEvents.forEach(event => {
      const dateKey = format(startOfDay(event.startDate), 'yyyy-MM-dd');
      if (!this.groupedEvents[dateKey]) {
        this.groupedEvents[dateKey] = [];
      }
      this.groupedEvents[dateKey].push(event);
    });
  }

  getCategoryColor(categoryId: string): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category?.color || '#3b82f6';
  }

  getCategoryName(categoryId: string): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category?.name || 'Uncategorized';
  }

  formatTime(date: Date): string {
    return format(date, 'h:mm a');
  }

  formatDateDisplay(dateKey: string): string {
    const date = new Date(dateKey);
    return format(date, 'EEEE, MMMM d, yyyy');
  }

  formatDateFull(date: Date): string {
    return format(date, 'MMM d, h:mm a');
  }

  isDateToday(dateKey: string): boolean {
    const date = new Date(dateKey);
    return isSameDay(date, new Date());
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return isSameDay(date1, date2);
  }
}

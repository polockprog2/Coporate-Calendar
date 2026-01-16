import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarView } from '../../types/calendar';
import { format } from 'date-fns';

@Component({
  selector: 'app-calendar-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
      <div class="flex items-center gap-4">
        <h1 class="text-xl font-normal text-gray-700">{{ getDateDisplay() }}</h1>
        
        <div class="flex gap-1 border border-gray-300 rounded">
          <button 
            (click)="navigate.emit('prev')" 
            class="px-3 py-1.5 text-gray-600 hover:bg-gray-100 border-r border-gray-300 transition-colors"
            title="Previous"
          >
            <span class="text-sm">←</span>
          </button>
          <button 
            (click)="today.emit()" 
            class="px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-100 border-r border-gray-300 transition-colors font-medium"
          >
            Today
          </button>
          <button 
            (click)="navigate.emit('next')" 
            class="px-3 py-1.5 text-gray-600 hover:bg-gray-100 transition-colors"
            title="Next"
          >
            <span class="text-sm">→</span>
          </button>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <select 
          [(ngModel)]="view" 
          (change)="viewChange.emit(view)" 
          class="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="month">Month</option>
          <option value="week">Week</option>
          <option value="day">Day</option>
          <option value="year">Year</option>
          <option value="agenda">Agenda</option>
        </select>
      </div>
    </div>
  `
})
export class CalendarHeaderComponent {
  @Input() currentDate!: Date;
  @Input() view: CalendarView = 'month';
  @Output() viewChange = new EventEmitter<CalendarView>();
  @Output() navigate = new EventEmitter<'prev' | 'next'>();
  @Output() today = new EventEmitter<void>();

  getDateDisplay(): string {
    switch (this.view) {
      case 'month':
        return format(this.currentDate, 'MMMM yyyy');
      case 'week':
        return format(this.currentDate, 'MMMM yyyy');
      case 'day':
        return format(this.currentDate, 'EEEE, MMMM d, yyyy');
      case 'year':
        return format(this.currentDate, 'yyyy');
      case 'agenda':
        return 'Agenda View';
      default:
        return '';
    }
  }
}

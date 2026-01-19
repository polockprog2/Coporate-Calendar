import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarService } from '../../../../core/services/calendar.service';
import { CalendarEvent } from '../../../../core/models/calendar-event.model';

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="calendar-container">
      <div class="calendar-header">
        <button (click)="previousMonth()" class="nav-btn">‹</button>
        <h2>{{ currentMonth }}</h2>
        <button (click)="nextMonth()" class="nav-btn">›</button>
        <div class="view-switcher">
          <button [class.active]="view === 'month'" (click)="view = 'month'" class="view-btn">Month</button>
          <button [class.active]="view === 'week'" (click)="view = 'week'" class="view-btn">Week</button>
          <button [class.active]="view === 'day'" (click)="view = 'day'" class="view-btn">Day</button>
        </div>
      </div>
      
      <div class="calendar-grid" *ngIf="view === 'month'">
        <div class="day-header" *ngFor="let day of weekDays">{{ day }}</div>
        <div 
          class="calendar-day" 
          *ngFor="let day of calendarDays"
          [class.other-month]="!day.isCurrentMonth"
          [class.today]="day.isToday"
          (click)="selectDay(day.date)"
        >
          <div class="day-number">{{ day.date.getDate() }}</div>
          <div class="events">
            <div 
              class="event-item" 
              *ngFor="let event of getEventsForDay(day.date)"
              [style.background]="event.color"
              [title]="event.title"
            >
              {{ event.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .calendar-container {
      flex: 1;
      padding: 2rem;
      background: white;
      overflow: auto;
    }
    
    .calendar-header {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    
    .calendar-header h2 {
      flex: 0 0 auto;
      margin: 0;
      font-size: 1.5rem;
      min-width: 200px;
      text-align: center;
    }
    
    .nav-btn {
      width: 36px;
      height: 36px;
      border: 1px solid #ddd;
      background: white;
      cursor: pointer;
      border-radius: 4px;
      font-size: 1.2rem;
      transition: all 0.2s;
    }
    
    .nav-btn:hover {
      background: #f5f5f5;
      border-color: #999;
    }
    
    .view-switcher {
      display: flex;
      gap: 0.5rem;
      margin-left: auto;
    }
    
    .view-btn {
      padding: 0.5rem 1rem;
      border: 1px solid #ddd;
      background: white;
      cursor: pointer;
      border-radius: 4px;
      transition: all 0.2s;
      font-weight: 500;
    }
    
    .view-btn:hover {
      border-color: #3498db;
    }
    
    .view-btn.active {
      background: #3498db;
      color: white;
      border-color: #3498db;
    }
    
    .calendar-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 1px;
      background: #ddd;
      border: 1px solid #ddd;
      border-radius: 4px;
      overflow: hidden;
    }
    
    .day-header {
      background: #f8f9fa;
      padding: 1rem;
      text-align: center;
      font-weight: 600;
      font-size: 0.9rem;
      color: #666;
    }
    
    .calendar-day {
      background: white;
      min-height: 120px;
      padding: 0.5rem;
      cursor: pointer;
      transition: background 0.2s;
      border-right: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
    }
    
    .calendar-day:hover {
      background: #f8f9fa;
    }
    
    .calendar-day.other-month {
      opacity: 0.3;
      background: #fafafa;
    }
    
    .calendar-day.today {
      background: #e3f2fd;
      border: 2px solid #3498db;
    }
    
    .day-number {
      font-weight: 600;
      margin-bottom: 0.5rem;
      font-size: 0.95rem;
      color: #333;
    }
    
    .events {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    
    .event-item {
      padding: 0.25rem 0.5rem;
      border-radius: 3px;
      font-size: 0.75rem;
      color: white;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 500;
    }
  `]
})
export class CalendarViewComponent implements OnInit {
  view: 'month' | 'week' | 'day' = 'month';
  currentDate = new Date();
  currentMonth = '';
  weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  calendarDays: any[] = [];
  events: CalendarEvent[] = [];

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {
    this.calendarService.getEvents().subscribe(events => {
      this.events = events;
    });
    this.generateCalendar();
  }

  generateCalendar(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    this.currentMonth = new Date(year, month).toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    this.calendarDays = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      
      this.calendarDays.push({
        date,
        isCurrentMonth: date.getMonth() === month,
        isToday: date.getTime() === today.getTime()
      });
    }
  }

  getEventsForDay(date: Date): CalendarEvent[] {
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    return this.events.filter(e => 
      e.startTime >= dayStart && e.startTime <= dayEnd
    );
  }

  selectDay(date: Date): void {
    this.calendarService.setSelectedDate(date);
  }

  previousMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
  }
}

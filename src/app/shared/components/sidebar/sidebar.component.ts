import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="sidebar">
      <div class="mini-calendar">
        <h3>{{ currentMonth }}</h3>
        <div class="weekdays">
          <div *ngFor="let day of ['S', 'M', 'T', 'W', 'T', 'F', 'S']" class="weekday">
            {{ day }}
          </div>
        </div>
        <div class="dates">
          <button *ngFor="let day of miniCalendarDays" 
                  class="date"
                  [class.today]="day.isToday">
            {{ day.date }}
          </button>
        </div>
      </div>

      <div class="quick-actions">
        <h3>Quick Actions</h3>
        <button class="action-btn primary" (click)="createEvent()">
          ➕ New Event
        </button>
        <button class="action-btn secondary" (click)="createTask()">
          ✓ New Task
        </button>
      </div>

      <div class="shortcuts">
        <h3>Shortcuts</h3>
        <a routerLink="/calendar" class="shortcut">
          📅 Calendar
        </a>
        <a routerLink="/tasks" class="shortcut">
          📋 Tasks
        </a>
        <a routerLink="/chat" class="shortcut">
          💬 Chat
        </a>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 280px;
      background: white;
      padding: 1.5rem;
      border-right: 1px solid #e0e0e0;
      overflow-y: auto;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    
    .mini-calendar,
    .quick-actions,
    .shortcuts {
      margin-bottom: 2rem;
    }
    
    h3 {
      margin: 0 0 1rem;
      font-size: 0.95rem;
      font-weight: 600;
      color: #333;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 0.25rem;
      margin-bottom: 0.5rem;
    }
    
    .weekday {
      text-align: center;
      font-size: 0.75rem;
      font-weight: 600;
      color: #999;
    }
    
    .dates {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 0.25rem;
    }
    
    .date {
      aspect-ratio: 1;
      border: 1px solid #f0f0f0;
      background: white;
      border-radius: 4px;
      font-size: 0.75rem;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .date:hover {
      background: #f5f5f5;
    }
    
    .date.today {
      background: #3498db;
      color: white;
      border-color: #3498db;
      font-weight: 600;
    }
    
    .action-btn {
      width: 100%;
      padding: 0.75rem;
      margin-bottom: 0.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s;
      font-size: 0.9rem;
    }
    
    .action-btn.primary {
      background: #3498db;
      color: white;
    }
    
    .action-btn.primary:hover {
      background: #2980b9;
      transform: translateY(-2px);
      box-shadow: 0 2px 8px rgba(52, 152, 219, 0.3);
    }
    
    .action-btn.secondary {
      background: #ecf0f1;
      color: #333;
      border: 1px solid #ddd;
    }
    
    .action-btn.secondary:hover {
      background: #ddd;
    }
    
    .shortcut {
      display: block;
      padding: 0.75rem 1rem;
      margin-bottom: 0.5rem;
      text-decoration: none;
      color: #333;
      border-radius: 4px;
      transition: all 0.2s;
    }
    
    .shortcut:hover {
      background: #f5f5f5;
      color: #3498db;
    }
  `]
})
export class SidebarComponent implements OnInit {
  currentMonth = '';
  miniCalendarDays: Array<{ date: number; isToday: boolean }> = [];

  ngOnInit(): void {
    this.updateMiniCalendar();
  }

  updateMiniCalendar(): void {
    const now = new Date();
    this.currentMonth = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    this.miniCalendarDays = [];
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      
      this.miniCalendarDays.push({
        date: date.getDate(),
        isToday: date.toDateString() === now.toDateString()
      });
    }
  }

  createEvent(): void {
    // Implement event creation
  }

  createTask(): void {
    // Implement task creation
  }
}

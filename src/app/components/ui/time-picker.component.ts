import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-time-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex items-center space-x-2">
      <select [(ngModel)]="hours" (change)="updateTime()" class="px-2 py-1 border border-gray-300 rounded text-sm">
        <option *ngFor="let h of getHours()" [value]="h">
          {{ formatHour(h) }}
        </option>
      </select>
      <span>:</span>
      <select [(ngModel)]="minutes" (change)="updateTime()" class="px-2 py-1 border border-gray-300 rounded text-sm">
        <option *ngFor="let m of getMinutes()" [value]="m">
          {{ formatMinute(m) }}
        </option>
      </select>
      <select [(ngModel)]="period" (change)="updateTime()" class="px-2 py-1 border border-gray-300 rounded text-sm" 
              *ngIf="!use24h">
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  `
})
export class TimePickerComponent implements OnInit {
  @Input() time: Date = new Date();
  @Input() use24h = false;
  @Output() timeChange = new EventEmitter<Date>();

  hours = 0;
  minutes = 0;
  period = 'AM';

  ngOnInit() {
    this.setTimeFromDate();
  }

  private setTimeFromDate() {
    this.hours = this.use24h ? this.time.getHours() : this.time.getHours() % 12 || 12;
    this.minutes = this.time.getMinutes();
    this.period = this.time.getHours() >= 12 ? 'PM' : 'AM';
  }

  getHours(): number[] {
    const max = this.use24h ? 23 : 12;
    return Array.from({ length: max + 1 }, (_, i) => i);
  }

  getMinutes(): number[] {
    return Array.from({ length: 60 }, (_, i) => i);
  }

  formatHour(h: number): string {
    return String(h).padStart(2, '0');
  }

  formatMinute(m: number): string {
    return String(m).padStart(2, '0');
  }

  updateTime() {
    let hours = this.hours;
    if (!this.use24h) {
      hours = this.period === 'PM' && this.hours !== 12 ? this.hours + 12 : this.hours;
      if (this.period === 'AM' && this.hours === 12) hours = 0;
    }
    const newTime = new Date(this.time);
    newTime.setHours(hours, this.minutes, 0, 0);
    this.timeChange.emit(newTime);
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface CalendarSettings {
  defaultView: 'month' | 'week' | 'day' | 'year' | 'agenda';
  showWeekends: boolean;
  showEventTimes: boolean;
  timeFormat: '12h' | '24h';
  startOfWeek: 'sunday' | 'monday';
}

@Component({
  selector: 'app-settings-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngIf="isOpen"
         class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
         (click)="close.emit()">
      <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-xl"
           (click)="$event.stopPropagation()">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-bold">⚙️ Settings</h2>
          <button (click)="close.emit()" class="text-gray-500 hover:text-gray-700 text-2xl">×</button>
        </div>
        
        <div class="space-y-6 max-h-96 overflow-y-auto">
          <!-- Default View -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Default Calendar View
            </label>
            <select [(ngModel)]="settings.defaultView" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500">
              <option value="month">Month</option>
              <option value="week">Week</option>
              <option value="day">Day</option>
              <option value="year">Year</option>
              <option value="agenda">Agenda</option>
            </select>
          </div>

          <!-- Time Format -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Time Format
            </label>
            <div class="space-y-2">
              <label class="flex items-center">
                <input type="radio" [(ngModel)]="settings.timeFormat" value="12h" name="timeFormat"
                       class="rounded border-gray-300">
                <span class="ml-2 text-sm text-gray-700">12-hour (AM/PM)</span>
              </label>
              <label class="flex items-center">
                <input type="radio" [(ngModel)]="settings.timeFormat" value="24h" name="timeFormat"
                       class="rounded border-gray-300">
                <span class="ml-2 text-sm text-gray-700">24-hour</span>
              </label>
            </div>
          </div>

          <!-- Week Settings -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Start of Week
            </label>
            <select [(ngModel)]="settings.startOfWeek" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500">
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
            </select>
          </div>

          <!-- Display Options -->
          <div class="space-y-3">
            <label class="flex items-center cursor-pointer">
              <input type="checkbox" [(ngModel)]="settings.showWeekends" 
                     class="rounded border-gray-300">
              <span class="ml-2 text-sm text-gray-700">Show Weekends</span>
            </label>
            <label class="flex items-center cursor-pointer">
              <input type="checkbox" [(ngModel)]="settings.showEventTimes" 
                     class="rounded border-gray-300">
              <span class="ml-2 text-sm text-gray-700">Show Event Times</span>
            </label>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end space-x-2 mt-6 border-t pt-4">
          <button (click)="close.emit()"
                  class="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button (click)="save.emit(settings)"
                  class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  `
})
export class SettingsModalComponent {
  @Input() isOpen = false;
  @Input() settings: CalendarSettings = {
    defaultView: 'month',
    showWeekends: true,
    showEventTimes: true,
    timeFormat: '12h',
    startOfWeek: 'sunday'
  };
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<CalendarSettings>();
}

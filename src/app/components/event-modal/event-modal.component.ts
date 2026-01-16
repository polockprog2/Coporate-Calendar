import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarEvent, Category } from '../../types/calendar';
import { format } from 'date-fns';

@Component({
  selector: 'app-event-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      *ngIf="isOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      (click)="close.emit()"
    >
      <div
        class="bg-white rounded-lg p-6 w-full max-w-md"
        (click)="$event.stopPropagation()"
      >
        <h2 class="text-2xl font-bold mb-4">
          {{ event ? 'Edit' : 'New' }} {{ type | titlecase }}
        </h2>

        <form (ngSubmit)="handleSave()">
          <div class="space-y-4">
            <!-- Title -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Title</label>
              <input
                [(ngModel)]="formData.title"
                name="title"
                type="text"
                required
                class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
              />
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                [(ngModel)]="formData.description"
                name="description"
                class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                rows="3"
              ></textarea>
            </div>

            <!-- Date & Time -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  [(ngModel)]="formData.startDateStr"
                  name="startDate"
                  type="datetime-local"
                  required
                  class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  [(ngModel)]="formData.endDateStr"
                  name="endDate"
                  type="datetime-local"
                  required
                  class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                />
              </div>
            </div>

            <!-- Category -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Category</label>
              <select
                [(ngModel)]="formData.category"
                name="category"
                class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
              >
                <option *ngFor="let cat of categories" [value]="cat.id">
                  {{ cat.name }}
                </option>
              </select>
            </div>

            <!-- Location -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Location</label>
              <input
                [(ngModel)]="formData.location"
                name="location"
                type="text"
                class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
              />
            </div>

            <!-- Task Completion -->
            <div *ngIf="type === 'task'">
              <label class="flex items-center">
                <input
                  [(ngModel)]="formData.isCompleted"
                  name="isCompleted"
                  type="checkbox"
                  class="rounded border-gray-300"
                />
                <span class="ml-2 text-sm text-gray-700">Mark as completed</span>
              </label>
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              (click)="close.emit()"
              class="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class EventModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() event: CalendarEvent | null = null;
  @Input() categories: Category[] = [];
  @Input() selectedDate: Date | undefined;
  @Input() type: 'event' | 'task' | 'venue' = 'event';
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Omit<CalendarEvent, 'id'>>();

  formData = {
    title: '',
    description: '',
    startDateStr: '',
    endDateStr: '',
    category: '',
    location: '',
    isCompleted: false
  };

  ngOnChanges() {
    if (this.event) {
      this.formData = {
        title: this.event.title,
        description: this.event.description,
        startDateStr: this.formatDateForInput(this.event.startDate),
        endDateStr: this.formatDateForInput(this.event.endDate),
        category: this.event.category,
        location: this.event.location || '',
        isCompleted: this.event.isCompleted || false
      };
    } else {
      const now = new Date();
      if (this.selectedDate) {
        const start = new Date(this.selectedDate);
        start.setHours(9, 0, 0, 0);
        const end = new Date(this.selectedDate);
        end.setHours(10, 0, 0, 0);
        this.formData.startDateStr = this.formatDateForInput(start);
        this.formData.endDateStr = this.formatDateForInput(end);
      } else {
        now.setHours(9, 0, 0, 0);
        const end = new Date(now);
        end.setHours(10, 0, 0, 0);
        this.formData.startDateStr = this.formatDateForInput(now);
        this.formData.endDateStr = this.formatDateForInput(end);
      }
      this.formData.category = this.categories[0]?.id || '';
    }
  }

  handleSave() {
    const eventData: Omit<CalendarEvent, 'id'> = {
      title: this.formData.title,
      description: this.formData.description,
      startDate: new Date(this.formData.startDateStr),
      endDate: new Date(this.formData.endDateStr),
      category: this.formData.category,
      type: this.type,
      location: this.formData.location,
      isCompleted: this.formData.isCompleted
    };
    this.save.emit(eventData);
  }

  private formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
}

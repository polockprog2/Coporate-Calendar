import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarEvent, Category } from '../../types/calendar';
import { format } from 'date-fns';

@Component({
  selector: 'app-event-details-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="isOpen && event"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      (click)="close.emit()"
    >
      <div
        class="bg-white rounded-lg p-6 w-full max-w-md"
        (click)="$event.stopPropagation()"
      >
        <div class="flex items-start justify-between mb-4">
          <div>
            <h2 class="text-2xl font-bold">{{ event.title }}</h2>
            <p class="text-sm text-gray-500">
              {{ event.type | uppercase }}
            </p>
          </div>
          <button
            (click)="close.emit()"
            class="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div class="space-y-4">
          <!-- Category Badge -->
          <div>
            <span
              class="inline-block px-3 py-1 rounded-full text-white text-sm font-medium"
              [style.backgroundColor]="getCategoryColor(event.category)"
            >
              {{ getCategoryName(event.category) }}
            </span>
          </div>

          <!-- Description -->
          <div *ngIf="event.description">
            <h3 class="font-semibold text-gray-700">Description</h3>
            <p class="text-gray-600 mt-1">{{ event.description }}</p>
          </div>

          <!-- Date & Time -->
          <div>
            <h3 class="font-semibold text-gray-700">Date & Time</h3>
            <p class="text-gray-600 mt-1">
              {{ format(event.startDate, 'MMMM d, yyyy') }}
            </p>
            <p class="text-gray-600">
              {{ format(event.startDate, 'h:mm a') }} - {{ format(event.endDate, 'h:mm a') }}
            </p>
          </div>

          <!-- Location -->
          <div *ngIf="event.location">
            <h3 class="font-semibold text-gray-700">Location</h3>
            <p class="text-gray-600 mt-1">📍 {{ event.location }}</p>
          </div>

          <!-- Attendees -->
          <div *ngIf="event.attendees && event.attendees.length > 0">
            <h3 class="font-semibold text-gray-700">Attendees</h3>
            <div class="mt-2 space-y-1">
              <p *ngFor="let attendee of event.attendees" class="text-gray-600">
                👤 {{ attendee }}
              </p>
            </div>
          </div>

          <!-- Status -->
          <div *ngIf="event.type === 'task'">
            <h3 class="font-semibold text-gray-700">Status</h3>
            <p class="text-gray-600 mt-1">
              {{ event.isCompleted ? '✓ Completed' : 'Pending' }}
            </p>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end space-x-2 mt-6">
          <button
            (click)="delete.emit(event.id)"
            class="px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-50"
          >
            Delete
          </button>
          <button
            (click)="edit.emit(event)"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Edit
          </button>
          <button
            (click)="close.emit()"
            class="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  `
})
export class EventDetailsModalComponent {
  @Input() isOpen = false;
  @Input() event: CalendarEvent | null = null;
  @Input() categories: Category[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() edit = new EventEmitter<CalendarEvent>();
  @Output() delete = new EventEmitter<string>();

  getCategoryColor(categoryId: string): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category?.color || '#3b82f6';
  }

  getCategoryName(categoryId: string): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category?.name || 'Uncategorized';
  }

  format = format;
}

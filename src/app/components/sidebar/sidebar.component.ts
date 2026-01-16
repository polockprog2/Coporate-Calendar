import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category, Label } from '../../types/calendar';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="w-64 bg-white border-r border-gray-200 flex flex-col h-screen overflow-hidden">
      <!-- Header -->
      <div class="p-4 border-b border-gray-200">
        <h1 class="text-xl font-normal text-gray-800 mb-4 flex items-center gap-2">
          <span class="text-2xl">📅</span>
          <span>Corporate Calendar</span>
        </h1>
        
        <!-- Search -->
        <div class="relative">
          <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          <input
            [(ngModel)]="searchQuery"
            (ngModelChange)="searchChange.emit($event)"
            placeholder="Search events..."
            class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
          />
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="p-6 border-b space-y-2">
        <button 
          (click)="addEvent.emit()"
          class="w-full px-4 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 font-medium"
        >
          <span class="text-lg">+</span>
          <span>Create</span>
        </button>
        <button 
          (click)="addTask.emit()"
          class="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center justify-center"
        >
          ✓ New Task
        </button>
        <button 
          (click)="addVenue.emit()"
          class="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center justify-center"
        >
          📍 New Venue
        </button>
      </div>

      <!-- Scrollable Content -->
      <div class="flex-1 overflow-y-auto">
        <!-- Categories Section -->
        <div class="p-6 border-b">
          <h3 class="font-semibold text-gray-700 mb-3">Categories</h3>
          <div class="space-y-2">
            <button
              (click)="categorySelect.emit(null)"
              [class.bg-gray-100]="!selectedCategory"
              class="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm"
            >
              All Categories
            </button>
            <button
              *ngFor="let category of categories"
              (click)="categorySelect.emit(category.id)"
              [class.bg-gray-100]="selectedCategory === category.id"
              class="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm flex items-center"
            >
              <span
                class="w-3 h-3 rounded-full mr-2"
                [style.backgroundColor]="category.color"
              ></span>
              {{ category.name }}
            </button>
          </div>
        </div>

        <!-- Labels Section -->
        <div class="p-6 border-b">
          <h3 class="font-semibold text-gray-700 mb-3">Labels</h3>
          <div class="space-y-2">
            <button
              *ngFor="let label of labels"
              class="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm flex items-center"
            >
              <span
                class="w-3 h-3 rounded-full mr-2"
                [style.backgroundColor]="label.color"
              ></span>
              {{ label.name }}
            </button>
          </div>
        </div>

        <!-- Settings Section -->
        <div class="p-6 border-t mt-auto">
          <h3 class="font-semibold text-gray-700 mb-3">More</h3>
          <button
            (click)="showSettings.emit()"
            class="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm flex items-center mb-2"
          >
            ⚙️ Settings
          </button>
          <button
            (click)="showProfile.emit()"
            class="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm flex items-center"
          >
            👤 User Profile
          </button>
        </div>
      </div>
    </div>
  `
})
export class SidebarComponent {
  @Input() categories: Category[] = [];
  @Input() labels: Label[] = [];
  @Input() selectedCategory: string | null = null;
  @Input() searchQuery = '';
  @Output() categorySelect = new EventEmitter<string | null>();
  @Output() addEvent = new EventEmitter<void>();
  @Output() addTask = new EventEmitter<void>();
  @Output() addVenue = new EventEmitter<void>();
  @Output() showProfile = new EventEmitter<void>();
  @Output() showSettings = new EventEmitter<void>();
  @Output() searchChange = new EventEmitter<string>();
}

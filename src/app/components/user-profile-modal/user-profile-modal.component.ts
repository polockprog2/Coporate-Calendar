import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile-modal',
  standalone: true,
  imports: [CommonModule],
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
        <h2 class="text-2xl font-bold mb-4">User Profile</h2>

        <div class="space-y-4">
          <!-- Avatar -->
          <div class="text-center">
            <div class="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mx-auto flex items-center justify-center text-white text-3xl">
              👤
            </div>
          </div>

          <!-- Profile Info -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Name</label>
            <p class="mt-1 text-gray-900">John Doe</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <p class="mt-1 text-gray-900">john@example.com</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Timezone</label>
            <p class="mt-1 text-gray-900">America/New_York</p>
          </div>

          <!-- Settings -->
          <div class="border-t pt-4">
            <h3 class="font-semibold text-gray-700 mb-3">Settings</h3>
            <div class="space-y-2">
              <label class="flex items-center">
                <input type="checkbox" checked class="rounded border-gray-300" />
                <span class="ml-2 text-sm text-gray-700">Email Notifications</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" checked class="rounded border-gray-300" />
                <span class="ml-2 text-sm text-gray-700">Calendar Reminders</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end space-x-2 mt-6">
          <button
            (click)="close.emit()"
            class="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Close
          </button>
          <button
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  `
})
export class UserProfileModalComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
}

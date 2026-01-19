import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="event-form">
      <h2>Create Event</h2>
      <!-- Event form content will go here -->
    </div>
  `,
  styles: [`
    .event-form {
      padding: 1rem;
    }
  `]
})
export class EventFormComponent {
}

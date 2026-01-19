import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="event-detail">
      <h2>Event Details</h2>
      <!-- Event detail content will go here -->
    </div>
  `,
  styles: [`
    .event-detail {
      padding: 1rem;
    }
  `]
})
export class EventDetailComponent {
}

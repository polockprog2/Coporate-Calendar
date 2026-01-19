import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="task-card">
      <h3>Task Card</h3>
      <!-- Task card content will go here -->
    </div>
  `,
  styles: [`
    .task-card {
      padding: 0.5rem;
    }
  `]
})
export class TaskCardComponent {
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="task-detail">
      <h2>Task Detail</h2>
      <!-- Task detail content will go here -->
    </div>
  `,
  styles: [`
    .task-detail {
      padding: 1rem;
    }
  `]
})
export class TaskDetailComponent {
}

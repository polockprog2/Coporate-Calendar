import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="task-board">
      <h2>Task Board</h2>
      <!-- Task board content will go here -->
    </div>
  `,
  styles: [`
    .task-board {
      padding: 1rem;
    }
  `]
})
export class TaskBoardComponent {
}

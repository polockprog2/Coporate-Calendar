import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="message-input">
      <input type="text" placeholder="Type a message..." />
      <button>Send</button>
    </div>
  `,
  styles: [`
    .message-input {
      display: flex;
      gap: 0.5rem;
      padding: 1rem;
    }
  `]
})
export class MessageInputComponent {
}

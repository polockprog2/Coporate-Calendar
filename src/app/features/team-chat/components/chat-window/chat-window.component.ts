import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chat-window">
      <h2>Chat Window</h2>
      <!-- Chat window content will go here -->
    </div>
  `,
  styles: [`
    .chat-window {
      padding: 1rem;
    }
  `]
})
export class ChatWindowComponent {
}

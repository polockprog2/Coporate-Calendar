import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chat-list">
      <h3>Chats</h3>
      <!-- Chat list content will go here -->
    </div>
  `,
  styles: [`
    .chat-list {
      padding: 1rem;
    }
  `]
})
export class ChatListComponent {
}

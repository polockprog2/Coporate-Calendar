import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamChatRoutingModule } from './team-chat-routing.module';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';

@NgModule({
  imports: [
    CommonModule,
    TeamChatRoutingModule,
    ChatWindowComponent
  ]
})
export class TeamChatModule { }

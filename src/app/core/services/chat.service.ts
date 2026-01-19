import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message, Channel } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messages$ = new BehaviorSubject<Message[]>([]);
  private channels$ = new BehaviorSubject<Channel[]>([]);
  private activeChannel$ = new BehaviorSubject<string | null>(null);

  getMessages(): Observable<Message[]> {
    return this.messages$.asObservable();
  }

  getChannels(): Observable<Channel[]> {
    return this.channels$.asObservable();
  }

  getActiveChannel(): Observable<string | null> {
    return this.activeChannel$.asObservable();
  }

  setActiveChannel(channelId: string): void {
    this.activeChannel$.next(channelId);
  }

  sendMessage(message: Message): void {
    const current = this.messages$.value;
    this.messages$.next([...current, message]);
  }

  getMessagesByChannel(channelId: string): Message[] {
    return this.messages$.value.filter(m => m.channelId === channelId);
  }

  createChannel(channel: Channel): void {
    const current = this.channels$.value;
    this.channels$.next([...current, channel]);
  }
}

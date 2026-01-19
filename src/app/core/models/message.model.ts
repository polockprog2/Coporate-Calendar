import { User } from './user.model';

export interface Message {
  id: string;
  text: string;
  sender: User;
  channelId: string;
  timestamp: Date;
  edited?: boolean;
  attachments?: string[];
}

export interface Channel {
  id: string;
  name: string;
  type: 'public' | 'private' | 'direct';
  members: User[];
  createdAt: Date;
}

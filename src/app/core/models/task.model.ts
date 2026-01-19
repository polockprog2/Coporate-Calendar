import { User } from './user.model';

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  IN_REVIEW = 'IN_REVIEW',
  DONE = 'DONE'
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface Comment {
  id: string;
  text: string;
  author: User;
  createdAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: User;
  reporter: User;
  dueDate?: Date;
  estimatedHours?: number;
  tags: string[];
  attachments: string[];
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

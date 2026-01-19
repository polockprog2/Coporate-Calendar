import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task, TaskStatus, Comment } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks$ = new BehaviorSubject<Task[]>([]);

  getTasks(): Observable<Task[]> {
    return this.tasks$.asObservable();
  }

  getTasksByStatus(status: TaskStatus): Task[] {
    return this.tasks$.value.filter(t => t.status === status);
  }

  addTask(task: Task): void {
    const current = this.tasks$.value;
    this.tasks$.next([...current, task]);
  }

  updateTask(id: string, updates: Partial<Task>): void {
    const current = this.tasks$.value;
    const updated = current.map(t => 
      t.id === id ? { ...t, ...updates, updatedAt: new Date() } : t
    );
    this.tasks$.next(updated);
  }

  deleteTask(id: string): void {
    const current = this.tasks$.value;
    this.tasks$.next(current.filter(t => t.id !== id));
  }

  addComment(taskId: string, comment: Comment): void {
    const current = this.tasks$.value;
    const updated = current.map(t => 
      t.id === taskId ? { ...t, comments: [...t.comments, comment] } : t
    );
    this.tasks$.next(updated);
  }

  moveTask(taskId: string, newStatus: TaskStatus): void {
    this.updateTask(taskId, { status: newStatus });
  }
}

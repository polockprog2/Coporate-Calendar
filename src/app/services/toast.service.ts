import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts$ = new Subject<Toast>();
  private removeToast$ = new Subject<string>();
  
  toasts$$ = this.toasts$.asObservable();
  removeToast$$ = this.removeToast$.asObservable();

  show(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', duration: number = 3000): void {
    const id = Date.now().toString();
    const toast: Toast = { id, message, type, duration };
    this.toasts$.next(toast);

    if (duration > 0) {
      setTimeout(() => this.remove(id), duration);
    }
  }

  remove(id: string): void {
    this.removeToast$.next(id);
  }
}

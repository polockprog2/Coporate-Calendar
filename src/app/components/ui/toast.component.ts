import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from '../../services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed bottom-4 right-4 z-50 space-y-2">
      <div *ngFor="let toast of toasts"
           [class]="'px-4 py-3 rounded-lg text-white font-medium animate-fade-in ' + getToastClass(toast.type)">
        {{ getIcon(toast.type) }} {{ toast.message }}
      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    :host ::ng-deep .animate-fade-in {
      animation: fadeIn 0.3s ease-in;
    }
  `]
})
export class ToastComponent implements OnInit {
  toasts: Toast[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toasts$$.subscribe(toast => {
      this.toasts.push(toast);
    });

    this.toastService.removeToast$$.subscribe(id => {
      this.toasts = this.toasts.filter(t => t.id !== id);
    });
  }

  getToastClass(type: string): string {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      default:
        return 'bg-blue-500';
    }
  }

  getIcon(type: string): string {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      default:
        return 'ℹ';
    }
  }
}
